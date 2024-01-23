import React from 'react'
import Popover from 'react-bootstrap/Popover'

export default function ToolTipPopover({ title, body }: { title?: any; body: any }) {
  return (
    <Popover id="popover-basic" className='dd-notification shadow border-0'>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body className="p-0">
        {Array.isArray(body) ? (
          <ul>
            {body.map((item) => {
              return <li key={item}>{item}</li>
            })}
          </ul>
        ) : (
          <div>{body}</div>
        )}
      </Popover.Body>
    </Popover>
  )
}
