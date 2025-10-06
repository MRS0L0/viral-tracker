export default function ChannelCard({ c }) {
  return (
    <div className="card">
      <div className="font-semibold">{c.channelTitle}</div>
      <div className="text-sm text-gray-300">{c.videoCount} viral shorts • {c.totalViews.toLocaleString()} views</div>
      <div className="mt-2 text-xs text-gray-300">Velocity: {c.avgVelocity} views/hr</div>
      <div className="mt-3"><a className="inline-block bg-red-600 px-3 py-1 rounded" href={`https://www.youtube.com/channel/${c.channelId}`} target="_blank" rel="noreferrer">Open Channel</a></div>
    </div>
  )
}
