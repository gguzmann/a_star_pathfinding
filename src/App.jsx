import { useEffect, useState } from 'react'
import { clearGrid, grid, Search } from './utils'

export default function App () {
  const [grilla, setGrilla] = useState([])
  const [tileSelect, setTileSelect] = useState('-,-')

  useEffect(() => {
    setGrilla(grid())
    console.log('crear grilla')
  }, [])

  const handleEnter = (tile) => {
    if (tile.obstacle) return
    const copy = [...grilla]
    clearGrid(copy)
    setTileSelect(`${tile.x},${tile.y}`)
    const search = Search(grilla, tile)
    search.forEach((n) => (n.active = true))
    setGrilla(copy)

    console.log(search)
  }

  const handleClick = (tile) => {
    const copy = [...grilla]
    const copyTile = copy[tile.x][tile.y]
    copyTile.obstacle = !copyTile.obstacle
    setGrilla(copy)
  }
  return (
    <div className='App flex items-center min-h-screen justify-center'>
      <div className='text-center'>
        {tileSelect}
        {grilla.map((x, i) => (
          <div className='flex' key={i}>
            {x.map((y, e) => (
              <div
                onMouseEnter={() => handleEnter(y)}
                onClick={() => handleClick(y)}
                className={`
                ${y.active ? 'bg-green-200' : 'bg-white-200'} 
                ${y.obstacle ? 'bg-black' : 'bg-white-200'} 
                h-[20px] w-[20px] border hover:bg-blue-200 cursor-pointer`}
                key={e}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
