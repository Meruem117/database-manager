import React, { Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import Nav from '../components/Nav'

export default function About(): React.ReactElement {
  return (
    <Fragment>
      <Nav active='2' />
      <Box sx={{ textAlign: 'center' }} mt={2}>
        <Typography variant="h4">
          About
        </Typography>
      </Box>
    </Fragment>
  )
}