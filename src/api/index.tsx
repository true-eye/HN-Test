export interface Story {
  id: number
  rank: number
  title: string
  by: string
  url: string
  score: number
  kids: []
}

export interface Comment {
  id: number
  by: string
  text: string
}

export const fetchHackerNewsPromise = async (count: number, page: number): Promise<Story[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const ids = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then((res) => res.json())
      const stories: any = await Promise.all(
        ids.slice(page * count, (page + 1) * count).map(
          async (id: number, index: number): Promise<Story> => {
            const story: Story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then((res) => res.json())
            story.rank = index + 1
            return story
          },
        ),
      )
      resolve(stories.sort((a: Story, b: Story) => a.rank - b.rank))
    } catch (e) {
      console.log(e)
    }
  })

export const fetchHackerNewsCommentsPromise = async (commentIds: number[]): Promise<Comment[]> => {
  return new Promise((resolve, reject) => {
    try {
      Promise.all(commentIds.map((commentId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`).then((res) => res.json()))).then((comments) =>
        resolve(comments.filter(Boolean)),
      )
    } catch (e) {
      reject(e)
    }
  })
}

export const fetchHackerNewsComments = async (commentIds: number[]): Promise<Comment[]> => {
  return Promise.all(commentIds.map((commentId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`).then((res) => res.json()))).then((comments) =>
    comments.filter(Boolean),
  )
}
