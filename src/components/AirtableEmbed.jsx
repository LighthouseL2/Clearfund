export default function AirtableEmbed({ embedUrl, height = "1000px" }) {
  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ height }}>
      <iframe
        className="airtable-embed"
        src={embedUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: '0'
        }}
      />
    </div>
  );
}
