//module to render goals for a specific recording
import React, { useEffect, useContext, useState } from "react";
import { GoalContext } from "./GoalProvider";
import { RecordingContext } from "../Recordings/RecordingProvider"
import { Button, Box, Heading, List, Text, Card, Menu } from "grommet";
import { Link } from "react-router-dom";
import { Edit, More, Trash } from "grommet-icons";
import { DeleteGoal } from "./DeleteGoal"

export const GoalsPerRecording = (props) => {
    const { getGoalByRecording } = useContext(GoalContext);

    const [goals, setGoals] = useState([])

    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    //gets the goals from the database
    useEffect(() => {
        getGoalByRecording(props.recordingId)
            .then(setGoals);
    }, []);


    return (
        <Box>
            <Box className="" direction="row">
                <Box background="background-contrast" elevation="small">
                </Box>
                <Box>
                    {goals.map((goal) => {
                        return (
                            <>
                                <DeleteGoal open={open} onClose={onClose} goalId={goal.id} />
                                <Box key={goal.id} width="medium">
                                    <Card className="container__cardContent" margin="small">
                                        <Heading level="3">{goal.category.label}</Heading>
                                        <Text>Goal: {goal.goal}</Text>
                                        <Text>Action: {goal.action}</Text>
                                        <Box width="xsmall">
                                            <Menu
                                                icon={<More />}
                                                hoverIndicator
                                                alignSelf="center"
                                                size="small"
                                                items={[
                                                    {
                                                        icon: (
                                                            <Box>
                                                                <Edit />
                                                            </Box>
                                                        ),
                                                        onClick: () =>
                                                            props.history.push(`/editgoal/${goal.id}/${props.recordingId}`),
                                                    },
                                                    {
                                                        icon: (
                                                            <Box>
                                                                <Trash />
                                                            </Box>
                                                        ),
                                                        onClick: () => onOpen(),
                                                    },
                                                ]}
                                            />
                                        </Box>
                                    </Card>

                                </Box>
                            </>
                        )
                    })}
                </Box>
            </Box>
        </Box>

    );
};
