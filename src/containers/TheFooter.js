import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
       <div>
        <a href="#">Liberia Revenue Authority</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
