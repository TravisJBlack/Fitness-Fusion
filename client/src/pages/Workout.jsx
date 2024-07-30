import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Stack,
    Text,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    VStack,
} from '@chakra-ui/react'
import { searchMucleGroup } from '../utils/api';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


const Workout = () => {
    const [muscleGroup, setMuscleGroup] = useState([])
    const {loading, data} = useQuery(QUERY_USER)

    const user = data?.user || [];
    console.log(user)
    const handleInput = async (searchInput) => {
        

        try {
            const response = await searchMucleGroup(searchInput);
            
            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const muscle = await response.json();
            console.log(muscle);
            setMuscleGroup(muscle);
        } catch (err) {
            console.error(err);
        }
    }

        return (
            <Stack spacing={4} mt={24} align="center">
                <Menu mt={30}>
                    <MenuButton as={Button} >
                        Muscle Group ↓
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleInput('biceps')} >Biceps</MenuItem>
                        <MenuItem onClick={() => handleInput('triceps')}>Triceps</MenuItem>
                        <MenuItem onClick={() => handleInput('chest')}>Chest</MenuItem>
                        <MenuItem onClick={() => handleInput('back')}>Back</MenuItem>
                        <MenuItem onClick={() => handleInput('legs')}>Legs</MenuItem>
                        <MenuItem onClick={() => handleInput('abs')}>Abs</MenuItem>
                        <MenuItem onClick={() => handleInput('stretching')}>Stretching</MenuItem>
                        <MenuItem onClick={() => handleInput('warm up')}>Warm up</MenuItem>
                        <MenuItem onClick={() => handleInput('lats')}>Lats</MenuItem>
                        <MenuItem onClick={() => handleInput('hamstring')}>Hamstring</MenuItem>
                        <MenuItem onClick={() => handleInput('calves')}>Calves</MenuItem>
                        <MenuItem onClick={() => handleInput('quadriceps')}>Quadriceps</MenuItem>
                        <MenuItem onClick={() => handleInput('trapezius')}>Trapezius</MenuItem>
                        <MenuItem onClick={() => handleInput('shoulders')}>Shoulders</MenuItem>
                        <MenuItem onClick={() => handleInput('glutes')}>Glutes</MenuItem>

                    </MenuList>
                </Menu>
               
                    {muscleGroup.map((muscle) => {
                        return (
                            <>
                                <p key={muscle.WorkOut}>
                                    {muscle.WorkOut}
                                </p>
                            </>
                        )
                    })}
                
            </Stack>
        )
    }

    export default Workout;