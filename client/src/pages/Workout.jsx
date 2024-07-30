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
} from "@chakra-ui/react";
import { searchMucleGroup } from "../utils/api";
import Auth from "../utils/auth";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom";

const loggedIn = Auth.loggedIn();
const beginnerSetsKey = "Beginner Sets".replace(/\s/g, "");
const IntermediateSetsKey = "Intermediate Sets".replace(/\s/g, "");

const Workout = () => {
  const [muscleGroup, setMuscleGroup] = useState([]);
  const { loading, data } = useQuery(QUERY_USER);

  const user = data?.user || [];
  console.log(user);
  const handleInput = async (searchInput) => {
    try {
      const response = await searchMucleGroup(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const muscle = await response.json();
      console.log(muscle);
      setMuscleGroup(muscle);
    } catch (err) {
      console.error(err);
    }
  };
  if (!loggedIn) {
    return (
      <Stack spacing={4} mt={24}>
        <Text fontSize="xl" color="red.500">
          You are not authorized to view this page. Please click below to log
          in.
          <br></br>
          <br></br>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </Text>
      </Stack>
    );
  }
  return (
    <Stack spacing={4} mt={24}>
      <Menu mt={30}>
        <MenuButton as={Button}>Muscle Group ↓</MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleInput("biceps")}>Biceps</MenuItem>
          <MenuItem onClick={() => handleInput("triceps")}>Triceps</MenuItem>
          <MenuItem onClick={() => handleInput("chest")}>Chest</MenuItem>
          <MenuItem onClick={() => handleInput("back")}>Back</MenuItem>
          <MenuItem onClick={() => handleInput("legs")}>Legs</MenuItem>
          <MenuItem onClick={() => handleInput("abs")}>Abs</MenuItem>
          <MenuItem onClick={() => handleInput("stretching")}>
            Stretching
          </MenuItem>
          <MenuItem onClick={() => handleInput("warm up")}>Warm up</MenuItem>
          <MenuItem onClick={() => handleInput("lats")}>Lats</MenuItem>
          <MenuItem onClick={() => handleInput("hamstring")}>
            Hamstring
          </MenuItem>
          <MenuItem onClick={() => handleInput("calves")}>Calves</MenuItem>
          <MenuItem onClick={() => handleInput("quadriceps")}>
            Quadriceps
          </MenuItem>
          <MenuItem onClick={() => handleInput("trapezius")}>
            Trapezius
          </MenuItem>
          <MenuItem onClick={() => handleInput("shoulders")}>
            Shoulders
          </MenuItem>
          <MenuItem onClick={() => handleInput("glutes")}>Glutes</MenuItem>
        </MenuList>
      </Menu>
      <div className="workout-container">
        {muscleGroup.map((muscle) => {
          return (
            <>
              <div className="workout-styles">
                <h3 key={muscle.WorkOut}>Workout: {muscle.WorkOut}</h3>
                <p key={muscle.Intensity_Level}>
                  - Intensity Level: {muscle.Intensity_Level}
                </p>
                <p key={muscle.Equipment}>- Equipment: {muscle.Equipment}</p>
                <p key={muscle.Explaination}>
                  - Explaination: {muscle["Long Explanation"]}
                </p>
                <p key={beginnerSetsKey}>
                  - Beginner Sets: {muscle["Beginner Sets"]}
                </p>
                <p key={IntermediateSetsKey}>
                  - Intermediate Sets: {muscle["Intermediate Sets"]}
                </p>
                <a href={muscle.Video}>Click here for related videos!</a>
              </div>
            </>
          );
        })}
      </div>
    </Stack>
  );
};

export default Workout;
