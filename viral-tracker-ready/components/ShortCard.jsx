export default function ShortCard({ video }) {
  const { title, channelTitle, thumbnails, url, views, publishedAt, durationSec } = video
  return (
    <div className="card flex gap-4">
      <a href={url} target="_blank" rel="noreferrer">
        <img src={thumbnails?.medium?.url || thumbnails?.default?.url} className="w-40 h-72 object-cover rounded-lg" alt="thumb" />
      </a>
      <div className="flex-1">
        <a href={url} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">{title}</a>
        <div className="text-sm text-gray-300 mt-1">{channelTitle} • {new Date(publishedAt).toLocaleString()}</div>
        <div className="mt-3 text-sm text-gray-100 font-medium">{views.toLocaleString()} views • {durationSec}s</div>
      </div>
    </div>
  )
}
