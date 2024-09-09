import React, { useState, useEffect } from "react";
import { useUsers } from "../api/allApi";
import Loader from "../components/Loading";
import { FaUser } from "react-icons/fa";
import { Table, Input, Button, Space, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Users() {
  const { users, loading, error } = useUsers();
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (users?.data) {
      setFilteredData(users.data);
    }
  }, [users]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    const filtered = users.data.filter((user) =>
      user[dataIndex]
        .toString()
        .toLowerCase()
        .includes(selectedKeys[0].toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setFilteredData(users?.data);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, user) => (
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              {user.profilePic ? (
                <img src={user.profilePic} alt="User Avatar" />
              ) : (
                <div
                  tabIndex={0}
                  className="btn btn-ghost btn-circle"
                  role="button"
                >
                  <FaUser className="text-2xl" />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm opacity-50">
              {user.studentID ? user.studentID : user.email}
            </div>
          </div>
        </div>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Badge
          status={status === "active" ? "success" : "error"}
          text={status}
        />
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (text, record) => (
        <Button
          onClick={() => navigate(`/users/${record.id}`)}
          className="btn-ghost btn-sm text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
        >
          details
        </Button>
      ),
    },
  ];

  if (loading) return <Loader />;

  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
        All{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
          Users
        </span>
      </h2>
      <div className="mx-16 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 20 }}
        />
      </div>
    </div>
  );
}

export default Users;
