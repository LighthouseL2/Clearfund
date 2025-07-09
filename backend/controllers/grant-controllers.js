import Grant from "../models/grant.js"



export const getAllGrants = async (req, res) => {
    try {
        const grants = await Grant.find()

        res.status(200).json({
            success: true,
            message: "Grants fetched successfully",
            data: grants
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch all grants"
        })
    }
}


export const getGrantById = async (req, res) => {
    try {
        const { id } = req.params

        if(!id) return res.status(300).json({
            success: "false",
            message: "Grant id is missing"
        })

        const grant = await Grant.findById(id)
        if(!grant) return res.status(404).json({
            success: false,
            message: "grant not found"
        })

        res.status(200).json({
            success: true,
            message: "operation was successful",
            data: grant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch grant"
        })
    }
}


export const addGrant = async (req, res) => {
    try {
        const { title, contributions, crowdfunded_usd, matched_usd, matched_usd_glo, total_usd} = req.body

        const checkGrant = await Grant.findOne({title})
        if(checkGrant) return res.json({
            success: false,
            message: "Grant already added to the database"
        })

        const newGrant = await Grant.create({
            title,
            contributions,
            crowdfunded_usd,
            matched_usd,
            matched_usd_glo,
            total_usd

        })

        return res.status(201).json({
            success: true,
            message: "grant created successfully",
            data: newGrant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to edit grant"
        })
    }
}




export const editGrant = async (req, res) => {
    try {
        const { id } = req.params
        const { title, contributions, crowdfunded_usd, matched_usd, matched_usd_glo, total_usd} = req.body
        const updatedGrant = await Grant.findByIdAndUpdate(id,
            {
                title,
                contributions,
                crowdfunded_usd,
                matched_usd,
                matched_usd_glo,
                total_usd
            },
            { new: true }
        )

        if(!updatedGrant) return res.status(404).json({
            success: false,
            message: "failed to edit grant, Grant not found"
        })

        return res.status(200).json({
            success: true,
            message: "grant edited successfully",
            data: updatedGrant
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to edit grant"
        })
    }
}


export const deleteGrant = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) return res.status(300).json({
            success: false,
            message: "Can't delete grant, grant id must be specified"
        })

        const deletedGrant = await Grant.findByIdAndDelete(id)

        if(!deletedGrant) return res.status(404).json({
            message: "Grant not found",
            success: false
        })

        return res.status(200).json({
            success: true,
            message: "grant deleted successfully",
            data: deletedGrant
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to delete grant ${error}`
        })
    }
}


