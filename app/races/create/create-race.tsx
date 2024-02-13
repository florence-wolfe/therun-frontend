"use client";

// eslint-disable-next-line import/named
import { useFormState, useFormStatus } from "react-dom";

import { Accordion, Button, Form } from "react-bootstrap";
import { createRace } from "~src/actions/races/create-race.action";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
} from "~src/components/breadcrumbs/breadcrumb";
import { UnderlineTooltip } from "~src/components/tooltip";
import { GameCategoryInput } from "~src/components/form/game-input";

export default function CreateRace() {
    const [state, formAction] = useFormState(createRace, { message: "" });

    const breadcrumbs: BreadcrumbItem[] = [
        { content: "Races", href: "/races" },
        { content: "Create a new Race" },
    ];
    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            {/*Todo: make nice flash messages for errors and success*/}
            {state?.message && state.message}

            <Form action={formAction} className={"row"}>
                <fieldset className={"border py-3 px-4"}>
                    <legend className={"w-auto mb-0"}>Create a new race</legend>
                    <GameCategoryInput className={"col-md-6"} />
                    <Accordion>
                        <Accordion.Item eventKey={"create"}>
                            <Accordion.Header>
                                Optional Race Options
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={"row g-3 mb-3"}>
                                    <Form.Group controlId={"customName"}>
                                        <Form.Label>Race Name</Form.Label>
                                        <Form.Control
                                            name={"customName"}
                                            type={"text"}
                                            placeholder={"Enter Custom Name"}
                                            required={false}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={"row g-3 mb-3"}>
                                    <Form.Group controlId={"description"}>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as={"textarea"}
                                            name={"description"}
                                            type={"textarea"}
                                            placeholder={
                                                "Description eg. bingo seed or tournament name"
                                            }
                                            required={false}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={"row g-3 mb-3 d-flex"}>
                                    <Form.Group controlId={"forceStream"}>
                                        <Form.Label>
                                            <UnderlineTooltip
                                                title={"Twitch Stream"}
                                                content={
                                                    "Force a specific stream instead of the participant's streams on the race page. Only input the name of the stream, no need to input https://twitch.tv/siglemic, just input siglemic"
                                                }
                                                element={"Twitch Stream"}
                                            />
                                        </Form.Label>
                                        <Form.Control
                                            name={"forceStream"}
                                            type={"text"}
                                            placeholder={
                                                "Enter the name of a stream to show"
                                            }
                                            required={false}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={"row g-3 mb-4"}>
                                    <Form.Group controlId={"password"}>
                                        <Form.Label>
                                            <UnderlineTooltip
                                                title={"Password"}
                                                content={
                                                    "Sets a password. Participants need to enter this password in order to join the race."
                                                }
                                                element={"Password"}
                                            />
                                        </Form.Label>
                                        <Form.Control
                                            name={"password"}
                                            type={"text"}
                                            placeholder={
                                                "Enter a Race Password"
                                            }
                                            required={false}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={"row g-3 mb-4"}>
                                    <Form.Group controlId={"countdown"}>
                                        <Form.Label>
                                            <UnderlineTooltip
                                                title={"Countdown seconds"}
                                                content={
                                                    "By default, the countdown when everyone is ready starts at 10 seconds. Customize that here"
                                                }
                                                element={"Countdown seconds"}
                                            />
                                        </Form.Label>
                                        <Form.Control
                                            name={"countdown"}
                                            type={"number"}
                                            required={false}
                                            min={3}
                                            step={1}
                                            max={60 * 60}
                                            defaultValue={10}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={"row g-3 mb-3"}>
                                    <Form.Group controlId={"ranked"}>
                                        <Form.Check
                                            name={"ranked"}
                                            type={"checkbox"}
                                            defaultChecked={true}
                                            label={"Ranked"}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={"selfJoin"}>
                                        <Form.Check
                                            name={"selfJoin"}
                                            type={"checkbox"}
                                            defaultChecked={true}
                                            label={"Self-join"}
                                        />
                                    </Form.Group>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className={"text-end mt-3"}>
                        <SubmitButton />
                    </div>
                </fieldset>
            </Form>
        </>
    );
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending} variant={"primary"} type="submit">
            {!pending ? "Create Race" : "Creating Race..."}
        </Button>
    );
};