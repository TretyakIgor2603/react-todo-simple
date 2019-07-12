import styled from 'styled-components'
import {Button} from 'antd'

const customButton = styled(Button)`
  color: red;  
`


const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh
  background-color: #f1f1f1;
  padding: 30px;
`

export default Page
