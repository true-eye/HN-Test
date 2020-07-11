import React, { useState, useEffect } from 'react'
import { fetchHackerNewsCommentsPromise, Comment } from '../api'

interface Props {
  commentIds: number[]
}

const HNComment = (props: Props) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetchHackerNewsCommentsPromise(props.commentIds)
      .then((res) => setComments(res))
      .finally(() => setLoading(false))
  }, [props.commentIds])

  console.log(comments)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {comments &&
        comments.map((comment) => (
          <li key={comment.id}>
            <p
              dangerouslySetInnerHTML={{
                __html: `${comment.text} (by ${comment.by})`,
              }}
            />
            <hr />
          </li>
        ))}
    </ul>
  )
}

export default HNComment
