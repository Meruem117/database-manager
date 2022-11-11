import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

export default function Nav() {
  const [active, setActive] = useState<string>('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActive(newValue)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={active} onChange={handleChange} centered>
        <Tab label="Home" value='1' href='/' />
        <Tab label="About" value='2' href='/about' />
      </Tabs>
    </Box>
  )
}