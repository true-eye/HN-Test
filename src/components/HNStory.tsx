import React, { memo } from 'react'
import { Story } from '../api/index'
import './HNStory.css'

interface Props {
  story: Story
  onClickComment: (story: Story) => void
  start: number
}

const HNStory = memo((props: Props) => {
  const { rank, url, title, score, kids } = props.story
  const commentCount = kids ? kids.length : 0

  return (
    <div className="storybook">
      <div className="rank">{props.start + rank}</div>
      <div className="item">
        <a className="title" href={url}>
          {title}
        </a>
        <div className="infobox">
          <span className="infoitem">{score} votes</span>
          <span className="infoitem">
            {commentCount ? (
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault()
                  props.onClickComment(props.story)
                }}
              >
                {`${commentCount} comments`}
              </a>
            ) : (
              <span>{commentCount}&nbsp; comment</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
})
export default HNStory
