import React, { Fragment, useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material'
import * as service from '../services'
import Nav from '../components/Nav'

export default function Home(): React.ReactElement {
  const [database, setDatabase] = useState<string>('')
  const [table, setTable] = useState<string>('')

  useEffect(() => {
    service.getDatabases().then(res => {
      console.log(res)
    })
  }, [])

  const changeDatabase = (event: SelectChangeEvent): void => {
    setDatabase(event.target.value)
  }

  const changeTable = (event: SelectChangeEvent): void => {
    setTable(event.target.value)
  }

  return (
    <Fragment>
      <Nav active='1' />
      <Box sx={{ textAlign: 'center' }} mt={2} mb={2}>
        <Typography variant="h4">
          Home
        </Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <FormControl sx={{ m: 1, minWidth: 360 }}>
          <InputLabel>Database</InputLabel>
          <Select
            value={database}
            label="Database"
            onChange={changeDatabase}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Select a database</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 360, marginLeft: 5 }}>
          <InputLabel>Table</InputLabel>
          <Select
            value={table}
            label="Table"
            onChange={changeTable}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Select a table</FormHelperText>
        </FormControl>
      </Box>
    </Fragment>
  )
}