import { NextResponse } from 'next/server'
import { PinataSDK } from 'pinata'
import { NFTStorage } from 'nft.storage'

/**
 * POST /api/ipfs/upload
 * Server-side API route for IPFS file uploads
 * Handles Pinata and NFT.Storage providers
 *
 * Body: FormData with 'file' and optional 'provider' fields
 * Returns: { cid: string } on success
 */
export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const rawProvider = formData.get('provider') || process.env.NEXT_PUBLIC_IPFS_PROVIDER || 'pinata'
    const provider = String(rawProvider).toLowerCase().trim()

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    let cid = null

    if (provider === 'pinata') {
      // PINATA_JWT must be server-side only (no NEXT_PUBLIC_ prefix)
      const jwt = process.env.PINATA_JWT?.trim()

      if (!jwt) {
        return NextResponse.json(
          { error: 'Pinata JWT token is not configured. Set PINATA_JWT in server environment variables.' },
          { status: 500 }
        )
      }

      // Initialize Pinata SDK with JWT (current SDK v3+ syntax)
      const pinata = new PinataSDK({
        pinataJwt: jwt,
        pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
      })

      // Upload file using the correct SDK method for this version (pinata.upload.public.file)
      // File object from formData is already a File/Blob that the SDK accepts directly
      const result = await pinata.upload.public.file(file)

      // The response contains 'cid' field (not IpfsHash)
      cid = result.cid
    }
    else if (provider === 'nft-storage') {
      // NFT_STORAGE_KEY must be server-side only (no NEXT_PUBLIC_ prefix)
      const token = process.env.NFT_STORAGE_KEY

      if (!token) {
        return NextResponse.json(
          { error: 'NFT.Storage API token is not configured. Set NFT_STORAGE_KEY in server environment variables.' },
          { status: 500 }
        )
      }

      const client = new NFTStorage({ token })
      cid = await client.storeBlob(file)
    }
    else {
      return NextResponse.json(
        { error: `Unsupported IPFS provider: ${provider}` },
        { status: 400 }
      )
    }

    return NextResponse.json({ cid })
  } catch (error) {
    console.error('IPFS upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload file to IPFS' },
      { status: 500 }
    )
  }
}

