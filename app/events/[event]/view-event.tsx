"use client";

import Image from "next/image";
import { EventWithOrganizerName } from "../../../types/events.types";
import { Can, subject } from "~src/rbac/Can.component";
import { Button } from "~src/components/Button/Button";
import Link from "next/link";
import { deleteEventAction } from "../actions/delete-event.action";
import { redirect } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
} from "~src/components/breadcrumbs/breadcrumb";
import { EventDates } from "../event-dates";
import { EventBadges } from "../event-badges";
import { Badge, Col, Row } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaFileAlt,
    FaHeart,
    FaMapMarkerAlt,
    FaTags,
    FaUserAlt,
} from "react-icons/fa";
import { EventLocation } from "../event-location";
import styles from "../event.styles.module.css";
import clsx from "clsx";

export const ViewEvent = ({ event }: { event: EventWithOrganizerName }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { content: "Events", href: "/events" },
        { content: event.name, href: "/events/" + event.id },
    ];

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <div className="mt-3">
                <div
                    className={clsx(
                        "container-fluid p-0 game-border mt-3 rounded-4 d-flex align-items-center shadow-lg border border-secondary",
                        styles["event-card"],
                    )}
                >
                    <Row className={clsx(styles["event-card-row"], "m-0")}>
                        <Col xl={2} lg={3} md={4} sm={5}>
                            <div className="w-100 d-flex justify-content-center align-items-center">
                                <Image
                                    alt={event.name}
                                    src={
                                        event.imageUrl ??
                                        "/logo_dark_theme_no_text_transparent.png"
                                    }
                                    height={200}
                                    width={200}
                                    className="rounded-start-4"
                                />
                            </div>
                        </Col>
                        <Col xl={10} lg={9} md={8} sm={7}>
                            <div className="ms-4 pt-4">
                                <h1 className="fw-bold">{event.name}</h1>
                                <p className="mb-1">
                                    <EventDates event={event} />
                                </p>
                                <div className="d-flex">
                                    <EventBadges event={event} />
                                </div>
                                <div className="card-text text-muted mt-3 border-start ps-2 mb-3">
                                    {event.shortDescription}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Description and Details Section */}
                <div className="card mt-4">
                    <div className="card-body">
                        <Row className="row-gap-3">
                            <Col xl={8} lg={8}>
                                <h3 className="card-title">
                                    <FaFileAlt className="me-2 mb-2 text-primary" />
                                    Event Description
                                </h3>
                                <div
                                    className="card-text border rounded-2 p-3 bg-body-tertiary"
                                    style={{
                                        maxHeight: "300px",
                                        overflowY: "auto",
                                        backgroundColor: "var(--bg-body)",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: event.description,
                                    }}
                                ></div>
                            </Col>
                            <Col xl={4} lg={4}>
                                <h3 className="card-title">
                                    <FaHeart className="me-2 mb-2 text-primary" />
                                    Event Details
                                </h3>
                                <div className="card-text border rounded-2 p-3 bg-body-tertiary">
                                    <div className="d-flex mb-3">
                                        <FaUserAlt className="me-2 text-primary flex-center h-100 mt-2" />
                                        <div className="ms-2 mb-1">
                                            <div>Organizer</div>
                                            <div className="fw-bold fs-5">
                                                {event.organizerName}
                                            </div>
                                        </div>
                                    </div>
                                    {event.location && (
                                        <div className="d-flex mb-3">
                                            <FaMapMarkerAlt className="me-2 text-danger flex-center h-100 mt-2" />
                                            <div className="ms-2 mb-1">
                                                <div>Location</div>
                                                <div className="fw-bold fs-5">
                                                    <EventLocation
                                                        location={
                                                            event.location
                                                        }
                                                        margin={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="d-flex mb-3">
                                        <FaCalendarAlt className="me-2 text-primary flex-center h-100 mt-2" />
                                        <div className="ms-2 mb-1">
                                            <div>Dates</div>
                                            <div className="fw-bold fs-5">
                                                <EventDates event={event} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h3>Links</h3>
                                </div>
                            </Col>
                        </Row>
                        <h3 className="card-title mt-3 mt-md-0">
                            <FaTags className="me-2 mb-2 text-primary" />
                            Event Tags
                        </h3>
                        <div>
                            {(event.tags ?? []).map((tag) => {
                                return (
                                    <Badge
                                        key={tag}
                                        bg="primary"
                                        className="ms-2 pt-2 pb-2 px-3"
                                        pill={true}
                                        style={{ fillOpacity: "50%" }}
                                    >
                                        <span className="fs-6">{tag}</span>
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 d-flex justify-content-end">
                    <Can I="edit" this={subject("event", event)}>
                        <Link href={`/events/${event.id}/edit`}>
                            <Button>Edit Event</Button>
                        </Link>
                    </Can>
                    <Can I="delete" this={subject("event", event)}>
                        <Button
                            className="ms-2"
                            variant="danger"
                            onClick={async () => {
                                if (
                                    confirm(
                                        "Are you sure you want to delete this event?",
                                    )
                                ) {
                                    await deleteEventAction(event.id);

                                    redirect("/events");
                                }
                            }}
                        >
                            Delete Event
                        </Button>
                    </Can>
                </div>
            </div>
        </>
    );
};
