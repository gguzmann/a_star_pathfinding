const col = 30
const row = 30

export const grid = () => {
  const arr = [1, 2]

  for (let i = 0; i < col; i++) {
    arr[i] = []
    for (let j = 0; j < row; j++) {
      arr[i][j] = {
        x: i,
        y: j,
        f: 0,
        g: 0,
        h: 0,
        obstacle: Math.random() > 0.9,
        parent: undefined,
        active: false,
        neigh: () => {
          const matriz = []
          if (i > 0) matriz.push(arr[i - 1][j])
          if (i < col - 1) matriz.push(arr[i + 1][j])
          if (j < row - 1) matriz.push(arr[i][j + 1])
          if (j > 0) matriz.push(arr[i][j - 1])
          return matriz
        }
      }
    }
  }
  return arr
}

export const clearGrid = (arr) => {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      arr[i][j].active = false
      arr[i][j].f = 0
      arr[i][j].g = 0
      arr[i][j].h = 0
      arr[i][j].parent = undefined
      arr[i][j].active = false
    }
  }
}

export const Search = (arr, end) => {
  const start = arr[0][0]
  const openSet = [start]
  const closedSet = []
  const path = []
  let possibleG
  console.log('start')
  while (openSet.length > 0) {
    let lowestIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i
    }

    const current = openSet[lowestIndex]

    // FINAL
    if (current === end) {
      let temp = current
      path.push(temp)
      while (temp.parent) {
        path.push(temp.parent)
        temp = temp.parent
      }
      console.log('DONE!')
      // return the traced path
      return path.reverse()
    }

    openSet.splice(lowestIndex, 1)
    closedSet.push(current)

    const neighbors = current.neigh()

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      if (neighbor.obstacle) continue
      if (!closedSet.includes(neighbor)) {
        possibleG = current.g + 1

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor)
        } else if (possibleG >= neighbor.g) {
          continue
        }

        neighbor.g = possibleG
        neighbor.h = heuristic(neighbor, end)
        neighbor.f = neighbor.g + neighbor.h
        neighbor.parent = current
      }
    }
  }
}

function heuristic (position0, position1) {
  const d1 = Math.abs(position1.x - position0.x)
  const d2 = Math.abs(position1.y - position0.y)

  return d1 + d2
}
