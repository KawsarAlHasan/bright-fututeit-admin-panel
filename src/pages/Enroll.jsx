import React, { useState, useEffect } from "react";
import { useEnrolled } from "../api/allApi";
import Loader from "../components/Loading";
import { FaUser } from "react-icons/fa";
import { Table, Input, Button, Space, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Enroll() {
  const { enrolled, loading, error } = useEnrolled();
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (enrolled?.data) {
      setFilteredData(enrolled.data);
    }
  }, [enrolled]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    const filtered = enrolled.data.filter((item) =>
      item[dataIndex]
        .toString()
        .toLowerCase()
        .includes(selectedKeys[0].toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setFilteredData(enrolled?.data);
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
      render: (text, enroll) => (
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              {enroll.profilePic ? (
                <img src={enroll.profilePic} alt="User Avatar" />
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
            <div className="font-bold">{enroll.name}</div>
            <div className="text-sm opacity-50">
              {enroll.studentID ? enroll.studentID : enroll.email}
            </div>
          </div>
        </div>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      ...getColumnSearchProps("course_name"),
    },
    {
      title: "Method & Amount",
      key: "paymentDetails",
      render: (text, enroll) => (
        <div>
          <p className="font-semibold">{enroll.payment_method}</p>
          <p className="font-normal">{enroll.amount}</p>
        </div>
      ),
    },
    {
      title: "Number & Txn ID",
      key: "transactionDetails",
      render: (text, enroll) => (
        <div>
          <p className="font-semibold">{enroll.sender_number}</p>
          <p className="font-normal">{enroll.txnid}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completed", value: "completed" },
        { text: "Pending", value: "pending" },
        { text: "Failed", value: "failed" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Badge
          status={
            status === "completed"
              ? "success"
              : status === "pending"
              ? "warning"
              : "error"
          }
          text={status}
        />
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (text, record) => (
        <Button
          onClick={() => navigate(`/enroll/${record.id}`)}
          className="btn-ghost text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
        >
          details
        </Button>
      ),
    },
  ];

  if (error) return <p>Error loading enrolled users</p>;

  return (
    <div>
      <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
        Enroll{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
          Users
        </span>
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-16 overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 20 }}
          />
        </div>
      )}
    </div>
  );
}

export default Enroll;
