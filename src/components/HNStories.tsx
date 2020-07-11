import React, { memo, useState, useEffect } from 'react'
import HNStory from './HNStory'
import { Story, fetchHackerNewsPromise } from '../api'

interface Props {
  className?: string
  stories: Story[]
  page: number
  start: number
  onClickComment: (story: Story) => void
  onPrev: () => void
  onNext: () => void
}

const HNStoriesWithResource = (props: { count: number; onClickComment: (story: Story) => void }) => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    fetchHackerNewsPromise(props.count, page)
      .then((res) => setStories(res))
      .finally(() => setLoading(false))
  }, [props.count, page])

  if (loading) {
    return <div>loading...</div>
  }

  return <HNStories stories={stories} onClickComment={props.onClickComment} page={page} start={page * props.count} onPrev={() => setPage(page - 1)} onNext={() => setPage(page + 1)} />
}

const HNStories = memo((props: Props) => {
  return (
    <section className={props.className}>
      {props.stories.map((story) => (
        <HNStory key={story.id} story={story} onClickComment={props.onClickComment} start={props.start} />
      ))}

      <footer className="more">
        {props.page > 0 && <button onClick={props.onPrev}>&lt; Prev Page</button>}
        &nbsp;Current Page: {props.page + 1} &nbsp;
        <button onClick={props.onNext}>Next Page &gt;</button>
      </footer>
    </section>
  )
})

export default HNStoriesWithResource
