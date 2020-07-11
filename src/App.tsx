import React, { lazy, useCallback, useState, Suspense } from 'react'

import { Story } from './api/index'
import HNStories from './components/HNStories'
import HNCommentType from './components/HNComment'
import Header from './components/Header'
import Modal from './components/Modal'
import Loading from './components/Loading'
import Prerender from './components/Prerender'
import './App.css'

const HNComment = lazy<typeof HNCommentType>(() => import('./components/HNComment'))

interface Props {
  count: number
}

const App = (props: Props) => {
  const [commentIds, setCommentIds] = useState([] as number[])

  const onClickComment = useCallback((story: Story) => {
    setCommentIds(story.kids)
  }, [])

  return (
    <div className="main">
      <div className="section">
        <Header title="Test (HackerNews)" />
        <Suspense fallback={<Loading />}>
          <HNStories count={props.count} onClickComment={onClickComment} />
        </Suspense>
        <Prerender visible={commentIds.length > 0}>
          <Modal onClose={() => setCommentIds([])}>
            <HNComment commentIds={commentIds} />
          </Modal>
        </Prerender>
      </div>
    </div>
  )
}
export default App
