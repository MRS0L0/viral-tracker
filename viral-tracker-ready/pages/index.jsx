import { useEffect,useState } from 'react'
import ShortCard from '../components/ShortCard'
import ChannelCard from '../components/ChannelCard'

export default function Home(){
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(false)
  const [days,setDays]=useState(7)
  useEffect(()=>{ fetchData() },[])
  async function fetchData(){
    try{ setLoading(true); const r=await fetch(`/api/shorts?days=${days}&maxResults=20`); const j=await r.json(); setData(j) }catch(e){ console.error(e); setData({items:[],channels:[],trending:[]}) }finally{ setLoading(false) }
  }
  function genIdeas(){
    if(!data) return []
    const words=data.trending.map(t=>t.word)
    return [
      `React to ${words.slice(0,2).join(' & ')}`,
      `Quick tutorial: ${words[0]||'trending'}`,
      `Compilation of ${words.slice(0,3).join(', ')}`
    ]
  }
  return (
    <div className="min-h-screen p-6">
      <header className="header">
        <div>
          <h1 className="text-3xl font-bold">Viral Tracker</h1>
          <div className="text-sm text-gray-400">Shorts-focused • Dark dashboard</div>
        </div>
        <div className="flex gap-2">
          <a className="px-3 py-2 bg-red-600 rounded-md" href="https://vercel.com">Powered</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <label className="text-sm text-gray-300">Days</label>
              <select value={days} onChange={e=>setDays(e.target.value)} className="bg-gray-800 px-2 py-1 rounded">
                <option value={1}>1</option><option value={3}>3</option><option value={7}>7</option>
              </select>
              <button onClick={fetchData} className="ml-2 bg-red-600 px-3 py-1 rounded">Refresh</button>
            </div>
            <div className="text-sm text-gray-300">Results: {data?.items?.length ?? '—'}</div>
          </div>

          <div className="space-y-4">
            {loading && <div className="text-gray-300">Loading...</div>}
            {data?.items?.map(v=> <ShortCard key={v.id} video={v} />)}
            {!loading && data?.items?.length===0 && <div className="text-gray-400">No results found.</div>}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="card">
            <h3 className="font-semibold">Trending words</h3>
            <div className="mt-3 flex flex-wrap gap-2">{data?.trending?.map(t=>(<span key={t.word} className="px-2 py-1 bg-gray-700 rounded text-sm">{t.word} ({t.count})</span>))}</div>
          </div>

          <div className="card">
            <h3 className="font-semibold">Idea suggestions</h3>
            <ul className="mt-2 list-disc list-inside">{genIdeas().map((it,i)=>(<li key={i}>{it}</li>))}</ul>
          </div>

          <div className="card">
            <h3 className="font-semibold">Fastest-growing channels</h3>
            <div className="mt-3 space-y-2">{data?.channels?.map(c=>(<ChannelCard key={c.channelId} c={c} />))}</div>
          </div>
        </aside>
      </main>
    </div>
  )
}
