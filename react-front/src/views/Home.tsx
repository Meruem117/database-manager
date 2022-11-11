import React, { Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import Nav from '../components/Nav'

export default function Home(): React.ReactElement {
  return (
    <Fragment>
      <Nav active='1' />
      <Box sx={{ textAlign: 'center' }} mt={2}>
        <Typography variant="h4">
          Home
        </Typography>
      </Box>
    </Fragment>
  )
}