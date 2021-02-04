import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import Link from 'next/link'

function AlertDismissibleExample() {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <Alert variant="warning" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh, não! Esta nota não existe.</Alert.Heading>
        <Link href={'../'}>
          <a>Voltar</a>
        </Link>
      </Alert>
    )
  }
}
export default AlertDismissibleExample
