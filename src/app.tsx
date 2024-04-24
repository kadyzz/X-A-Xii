import React, { ReactNode, useState } from 'react'
import { Button} from '@chakra-ui/react'
import {
  Container,
  Box,
  P,
  HStack,
  H1,
  H3,
  Input,
  Capitalized
} from '@northlight/ui'
import { ExcelDropzone, ExcelRow } from './excel-dropzone.jsx'
import { defaultScore, calcScore, UserScores } from './currentHighScore.jsx'

const userScores = defaultScore();

export default function App() {

  const [sheetData, setSheetData] = useState<UserScores[]>(userScores) //rerender whenever sheetData changes

  function handleSheetData(data: ExcelRow[]) {
    setSheetData(calcScore(data))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { //stackoverflow
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const score = parseInt(formData.get('score') as string);

    const newEntry = { name, score };
    const newSheetData = [...sheetData, newEntry];

    //sort again
    const sortedSheetData = calcScore(newSheetData);

    // Update sheetData 
    setSheetData(sortedSheetData);

    // Reset the form
    event.currentTarget.reset();
  };

  //Each rendered element is wrapped in a <React.Fragment> to avoid adding unnecessary DOM elements, 
  //and a unique key is provided for each element to help React efficiently update the list when it changes.
  return (
    <Container maxW="6xl" padding="4">
        <H1 sx={{ color: 'pink.500' }} margin="10" textAlign='center' >User Rankings</H1>
      <Box p="5" shadow='md' borderWidth='1px' borderRadius="10">
        <H3 marginBottom="2" sx={{ color: 'pink.500' }}>Users with the highest scores</H3>
        <P>
          {sheetData.map((userScore, index) => (
            <React.Fragment key={index}>
              <span>{userScore.name}: {userScore.score}</span>
              <br />
            </React.Fragment>
          ))}
        </P>
      </Box>
      <HStack align="left" spacing="10" marginTop="10">
        <Box>
          <ExcelDropzone
            onSheetDrop={handleSheetData}
            label="Import score (excel) file here"
          />
        </Box>
        <Box>
          <Capitalized marginLeft="1" sx={{ color: 'pink.400' }}>Add new user scores here:</Capitalized>
          <Box margin="1" marginTop={3}>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <Input type="text" name="name" focusBorderColor='#f29bec' size="sm" />
              </label>
              <br />
              <label>
                Score:
                <Input type="number" name="score" focusBorderColor='#f29bec' size="sm" />
              </label>
              <br />
              <Button marginTop="2" colorScheme='pink' size='sm' type="submit">Submit</Button>
            </form>
          </Box>
          <P>
          </P>
          <P>
          </P>
        </Box>
      </HStack>
    </Container>
  )
}
