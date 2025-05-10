import React from "react";
import { Link } from "react-router-dom";
import { useOrganization } from "./organization.context";
import { CircularProgress, Pagination } from "@mui/material";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const { organization, setOrganization } = useOrganization();
  const [filterValue, setFilterValue] = React.useState<string>(organization);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [loading, setLoading] = React.useState<boolean>(false);

  const pages = Math.ceil(members.length / rowsPerPage);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/orgs/${organization}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [organization]);

  const paginatedMembers = members.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterValue(value);
  };

  const handleOrganizationSearch = () => {
    setOrganization(filterValue);
  };

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    setLoading(true);
    setPage(value);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  return (
    <>
      <div className="header-page">
        <div style={{ display: "flex", alignContent: "center", gap: "1rem" }}>
          <h2 className="rick-title">List Page</h2>
          <Link className="list-redirect" to="/rick-list">
            Go to Rick List
          </Link>
        </div>
        <div className="organization-filter-container">
          <input
            className="organization-filter"
            type="text"
            name="organization"
            value={filterValue}
            onChange={handleFieldChange}
          />
          <button
            className="organization-filter-button"
            onClick={handleOrganizationSearch}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          color="primary"
          count={pages}
          page={page}
          onChange={handlePageChange}
        />
        <select
          className="pagination-select"
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

      {!loading ? (
        <div className="list-user-list-container">
          <span className="list-header">Avatar</span>
          <span className="list-header">Id</span>
          <span className="list-header">Name</span>

          {paginatedMembers.map((member) => (
            <React.Fragment key={member.id}>
              <img src={member.avatar_url} />
              <span>{member.id}</span>
              <Link to={`/detail/${member.login}`}>{member.login}</Link>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="loading-container">
          <CircularProgress />
          <span>Cargando...</span>
        </div>
      )}

      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
