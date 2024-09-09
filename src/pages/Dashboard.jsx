import React from "react";
import { Card, Table, Tag } from "antd";
import { PieChart } from "react-minimal-pie-chart"; // for chart, or use any chart library you prefer

const Dashboard = () => {
  const data = [
    { title: "United States", value: 10, color: "#E38627" },
    { title: "Brazil", value: 15, color: "#C13C37" },
    { title: "France", value: 20, color: "#6A2135" },
    { title: "Turkey", value: 25, color: "#4CAF50" },
    { title: "India", value: 30, color: "#2196F3" },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Completed"
            ? "green"
            : status === "Ongoing"
            ? "orange"
            : "red";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const dataSource = [
    {
      key: "1",
      id: "354",
      customer: "Daniel Gibson",
      status: "Review",
      dateAdded: "04-11-2018",
      total: "$420.40",
    },
    {
      key: "2",
      id: "735",
      customer: "Connor Roberson",
      status: "Ongoing",
      dateAdded: "11-05-2018",
      total: "$120.10",
    },
    {
      key: "3",
      id: "132",
      customer: "Seth Weber",
      status: "Completed",
      dateAdded: "08-07-2018",
      total: "$620.10",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Statistic Cards */}
        <Card className="col-span-1">
          <p>$3,458.00</p>
          <p>Weekly Sale</p>
        </Card>
        <Card className="col-span-1">
          <p>$43,567.43</p>
          <p>Monthly Sale</p>
        </Card>
        <Card className="col-span-1">
          <p>2304</p>
          <p>Unique visitors</p>
        </Card>
        <Card className="col-span-1">
          <p>30240</p>
          <p>Unique Views</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Visitors by Country and Another Chart */}
        <Card className="col-span-1">
          <h3>Visitors by Country</h3>
          <PieChart data={data} />
        </Card>
        <Card className="col-span-1">
          <h3>Another Chart</h3>
          {/* Example Chart Component */}
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Latest Orders and Users */}
        <Card className="col-span-1">
          <h3>Latest Orders</h3>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
        <Card className="col-span-1">
          <h3>Users</h3>
          {/* Users List */}
          <ul>
            <li className="flex items-center justify-between">
              <div>
                <p>Stephen Nguyen</p>
                <p>Developer</p>
              </div>
              <Tag color="green">Online</Tag>
            </li>
            {/* Repeat for other users */}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
