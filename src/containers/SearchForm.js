import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const SearchForm = () => (
  <Form>
    <Form.Field>
      <label>Folder Name</label>
      <input placeholder='Folder Name' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default SearchForm