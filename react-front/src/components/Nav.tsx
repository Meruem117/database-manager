import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

export default function Nav(props: { active: string }) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={props.active} centered>
        <Tab label="Home" value='1' href='/' />
        <Tab label="About" value='2' href='/about' />
      </Tabs>
    </Box>
  )
}