import { Count, GameLeaderboard } from "../../pages/game/[game]";
import { Col, Nav, Row, Tab, Table } from "react-bootstrap";
import { DurationToFormatted, getFormattedString } from "../util/datetime";
import { ReactElement, useState } from "react";
import { UserLink } from "../links/links";
import searchStyles from "../css/Search.module.scss";
import styles from "../css/Games.module.scss";
import DataTable from 'react-data-table-component';
import datatablestyles from '../css/ReactDataTable.module.scss';

type Leaderboard = {
  rank: number;
  username: string;
  stat: string | number;
  meta?: any;
  game?: string | undefined;
  category?: string | undefined;
  url?: string | undefined;
};

export const getLeaderboard = (name: string, leaderboards: Count[], search: string, transform?: (
    stat: string | number,
    key: number
) => string | number | ReactElement) => {

    const customStyles = {
        headCells: {
            className: datatablestyles.headCells,
        },
        cells: {
            className: datatablestyles.cells,
        },
    };


    const filteredLeaderboards = leaderboards.filter(leaderboard => 
      leaderboard.username.toLowerCase().includes(search.toLowerCase())
    );

    const columns: TableColumn<{ rank: number; username: string; stat: string | number; meta?: any; game?: string | undefined; category?: string | undefined; url?: string | undefined; }>[] = [
        {
          name: '#',
          selector: (row) => row.rank,
          sortable: true,
          width: '14%',
          center: true,
        },
        {
          name: 'User',
          cell: (row) => <UserLink url={row.url} username={row.username} />,
          width: '38%',
          center: true,
        },
        {
          name: name,
          cell: (row) => {
            return transform ? transform(row.stat, row.rank - 1) : row.stat.toLocaleString();
          },
          width: '38%',
          center: true,
        },
    ];

    const data = filteredLeaderboards.map((leaderboard, index) => {
        return {
            ...leaderboard,
            rank: index + 1,
        };
    });

    return (
        <DataTable
          title=""
          columns={columns}
          data={data}
          customStyles={customStyles}
          striped={search.length === 0}
          highlightOnHover
          responsive
          pagination
          
        />
    );
};


export const getStatsTable = (values: Map<string, string>) => {
    return (
        <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
            <Table>
                <tbody>
                    {Array.from(values).map(([key, value]) => {
                        return (
                            <tr key={key}>
                                <td style={{ paddingLeft: 0 }}>{key}</td>
                                <td
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        paddingRight: "0",
                                    }}
                                >
                                    {value}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export const getAverageFromLeaderboard = (counts: Count[]) => {
    if (counts.length < 1) return 0;

    const sum = counts
        .map((count) => parseInt(count.stat))
        .reduce((a, b) => a + b, 0);

    return sum / counts.length;
};

export const GameLeaderboards = ({
    leaderboards,
}: {
    leaderboards: GameLeaderboard;
}) => {
    const [search, setSearch] = useState("");

    const completePercentageLeaderboard = getLeaderboard(
        "Completion %",
        leaderboards.completePercentageLeaderboard,
        search,
        (stat) => {
            return `${((stat as number) * 100).toFixed(2)}%`;
        }
    );
    const playtimeLeaderboard = getLeaderboard(
        "Total Playtime",
        leaderboards.totalRunTimeLeaderboard,
        search,
        (stat) => {
            return (
                <DurationToFormatted
                    duration={stat ? stat.toString() : ""}
                    padded={true}
                />
            );
        }
    );

    return (
        <Tab.Container id="game-tabs" defaultActiveKey="game-playtime">
            <Row>
                <Col lg={3} md={4}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="game-playtime" href="#">
                                Total playtime
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="game-attempts" href="#">
                                Total attempts
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="game-finished-attempts"
                                href="#"
                            >
                                Finished attempts
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="game-completion" href="#">
                                Completion %
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="game-uploads" href="#">
                                Total Uploads
                            </Nav.Link>
                        </Nav.Item>
                        <Tab.Content>
                            <Tab.Pane eventKey="game-playtime">
                                {getStatsTable(
                                    new Map<string, string>([
                                        [
                                            "Combined",
                                            getFormattedString(
                                                leaderboards.stats.totalRunTime.toString(),
                                                false,
                                                true
                                            ),
                                        ],
                                        [
                                            "Highest",
                                            getFormattedString(
                                                leaderboards.totalRunTimeLeaderboard[0].stat.toString(),
                                                false,
                                                true
                                            ),
                                        ],
                                        [
                                            "Average",
                                            getFormattedString(
                                                getAverageFromLeaderboard(
                                                    leaderboards.totalRunTimeLeaderboard
                                                ).toString(),
                                                false,
                                                true
                                            ),
                                        ],
                                    ])
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="game-attempts">
                                {getStatsTable(
                                    new Map<string, string>([
                                        [
                                            "Combined",
                                            leaderboards.stats.attemptCount.toLocaleString(),
                                        ],
                                        [
                                            "Highest",
                                            leaderboards.attemptCountLeaderboard[0].stat.toLocaleString(),
                                        ],
                                        [
                                            "Average",
                                            parseInt(
                                                getAverageFromLeaderboard(
                                                    leaderboards.attemptCountLeaderboard
                                                ).toFixed(0)
                                            ).toLocaleString(),
                                        ],
                                    ])
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="game-finished-attempts">
                                {getStatsTable(
                                    new Map<string, string>([
                                        [
                                            "Combined",
                                            leaderboards.stats.finishedAttemptCount.toLocaleString(),
                                        ],
                                        [
                                            "Highest",
                                            leaderboards.finishedAttemptCountLeaderboard[0].stat.toLocaleString(),
                                        ],
                                        [
                                            "Average",
                                            parseInt(
                                                getAverageFromLeaderboard(
                                                    leaderboards.finishedAttemptCountLeaderboard
                                                ).toFixed(0)
                                            ).toLocaleString(),
                                        ],
                                    ])
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="game-completion">
                                {getStatsTable(
                                    new Map<string, string>([
                                        [
                                            "Average %",
                                            `${(
                                                (leaderboards.stats
                                                    .finishedAttemptCount /
                                                    leaderboards.stats
                                                        .attemptCount) *
                                                100
                                            ).toFixed(2)}%`,
                                        ],
                                        [
                                            "Total attempts",
                                            leaderboards.stats.attemptCount.toLocaleString(),
                                        ],
                                        [
                                            "Finished attempts",
                                            leaderboards.stats.finishedAttemptCount.toLocaleString(),
                                        ],
                                    ])
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="game-uploads">
                                {getStatsTable(
                                    new Map<string, string>([
                                        [
                                            "Combined",
                                            leaderboards.stats.uploadCount.toLocaleString(),
                                        ],
                                        [
                                            "Highest",
                                            leaderboards.uploadLeaderboard[0].stat.toLocaleString(),
                                        ],
                                        [
                                            "Average",
                                            parseInt(
                                                getAverageFromLeaderboard(
                                                    leaderboards.uploadLeaderboard
                                                ).toFixed(0)
                                            ).toLocaleString(),
                                        ],
                                    ])
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Nav>
                </Col>
                <Col lg={9} md={8}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div
                            className={`${searchStyles.searchContainer} ${styles.filter}`}
                        >
                            <span
                                className={"material-symbols-outlined"}
                                onClick={() => {
                                    const searchElement =
                                        document.getElementById("gameSearch");
                                    if (
                                        document.activeElement !== searchElement
                                    ) {
                                        searchElement.focus();
                                    }
                                }}
                            >
                                {" "}
                                search{" "}
                            </span>
                            <input
                                type="search"
                                className={`form-control ${searchStyles.search}`}
                                placeholder="Filter by name"
                                style={{ marginBottom: "0" }}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                value={search}
                                id="gameSearch"
                            />
                        </div>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="game-playtime">
                            {playtimeLeaderboard}
                        </Tab.Pane>
                        <Tab.Pane eventKey="game-attempts">
                            {getLeaderboard(
                                "Total Attempts",
                                leaderboards.attemptCountLeaderboard,
                                search
                            )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="game-finished-attempts">
                            {getLeaderboard(
                                "Total Finished Runs",
                                leaderboards.finishedAttemptCountLeaderboard,
                                search
                            )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="game-completion">
                            {completePercentageLeaderboard}
                        </Tab.Pane>
                        <Tab.Pane eventKey="game-uploads">
                            {getLeaderboard(
                                "Total Uploads",
                                leaderboards.uploadLeaderboard,
                                search
                            )}
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default GameLeaderboards;
