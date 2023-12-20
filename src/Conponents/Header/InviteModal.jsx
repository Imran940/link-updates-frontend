import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  BellFilled,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sendUserInvitation, updateInvitedUser } from "../../functions/user";

const { Item } = Form;
function InviteModal({ isOpen, setIsOpen }) {
  const [openType, setOpenType] = useState("view");
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState({});
  const { invited_users: invitedUsers } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const accessToken = localStorage.getItem("accessToken");
  const [PopconfirmVisible, setPopConfirmVisible] = useState({});
  const dispatch = useDispatch();

  const handleInvitedUserStatusChange = async (e, payload) => {
    if (!payload) return;
    const id = payload.id;
    try {
      e.stopPropagation();
      payload.type == "update"
        ? setLoadingState({
            [id]: true,
          })
        : setLoading(true);
      const response = await updateInvitedUser(payload, accessToken);
      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: response.data,
      });
      payload.type == "update"
        ? setLoadingState({
            [id]: false,
          })
        : setLoading(false);
      setPopConfirmVisible({
        ...PopconfirmVisible,
        [id]: false,
      });
      if (payload.type == "delete")
        toast("User deleted successfully", { type: "success" });
      else toast("User updated successfully", { type: "success" });
    } catch (err) {
      console.log(err);
      toast("Failed", { type: "error" });
      payload.type == "update"
        ? setLoadingState({
            [id]: false,
          })
        : setLoading(false);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "cursor-pointer",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "cursor-pointer",
    },
    {
      title: "Status",
      key: "status",
      className: "cursor-pointer",
      render: ({ name, status, deviceTokenStatus }) => (
        <div>
          <Tag
            color={
              status == "pending"
                ? "orange"
                : status == "active"
                ? "green"
                : "red"
            }
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
          {deviceTokenStatus == "on" ? (
            <BellFilled
              title={`${name} turned on their notification`}
              style={{ color: "green" }}
            />
          ) : (
            <BellFilled
              title={`${name} turned off their notification`}
              style={{ color: "red" }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      //@ts-expect-error ignore this record and _ types
      render: (_, record) => (
        <Space size="middle">
          {record.status == "pending" ? (
            <a
              onClick={async (e) => {
                try {
                  e.stopPropagation();
                  setLoadingState((prevValues) => ({
                    ...prevValues,
                    [record.id]: true,
                  }));
                  await sendUserInvitation(
                    {
                      name: record.name,
                      email: record.email,
                      sendInviteAgain: true,
                    },
                    accessToken
                  );
                  setLoadingState((prevValues) => ({
                    ...prevValues,
                    [record.id]: false,
                  }));
                  toast(`Re-Invitation sent successfully to ${record.email}`);
                } catch (err) {
                  console.log(err);
                  setLoadingState((prevValues) => ({
                    ...prevValues,
                    [record.id]: false,
                  }));
                  toast("Something happened wrong", { type: "error" });
                }
              }}
            >
              {loadingState[record.id] ? <LoadingOutlined /> : "Re-Invite"}
            </a>
          ) : null}

          <div
            onClick={(e) =>
              handleInvitedUserStatusChange(e, {
                id: record.id,
                type: "update",
                status: record.status == "active" ? "block" : "active",
              })
            }
          >
            {record.status == "active" ? (
              <a
                title={`Click to block ${record.name}`}
                onClick={(e) => handleBlockOrUnBlock(e, record, "block")}
              >
                {loadingState[record.id] ? <LoadingOutlined /> : "Block"}
              </a>
            ) : (
              record.status == "block" && (
                <a onClick={(e) => handleBlockOrUnBlock(e, record, "unblock")}>
                  {loadingState[record.id] ? <LoadingOutlined /> : "Un-Block"}
                </a>
              )
            )}
          </div>

          <Popconfirm
            open={PopconfirmVisible[record.id]}
            okButtonProps={{
              title: "Delete",
              loading: loading,
              style: { background: "red", color: "white" },
            }}
            onCancel={(e) => {
              e?.stopPropagation();
              setPopConfirmVisible({
                ...PopconfirmVisible,
                [record.id]: false,
              });
            }}
            title={`Are you sure that you want to delete this ${record.name}`}
            onConfirm={(e) =>
              handleInvitedUserStatusChange(e, {
                type: "delete",
                id: record.id,
              })
            }
          >
            <a
              onClick={(e) => {
                e.stopPropagation();
                setPopConfirmVisible({
                  ...PopconfirmVisible,
                  [record.id]: true,
                });
              }}
              className="text-red-600"
            >
              Delete
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await sendUserInvitation(values, accessToken);
      console.log(response);
      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: response.data.user,
      });
      toast(response.data.message, { type: "success" });
      setLoading(false);
      setOpenType("view");
    } catch (err) {
      console.log(err);
      toast("Something went wrong", { type: "error" });
    }
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setOpenType("view");
        setIsOpen(false);
        form.resetFields();
        // resetFieldValues();
      }}
      footer={null}
      width={openType == "view" ? 650 : 370}
    >
      <div
        className="flex flex-col"
        style={{ gap: "18px", margin: "20px 15px" }}
      >
        {openType == "view" ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <span className="text-2xl font-bold">All Members</span>

              <Button
                title="Click to add member"
                icon={<UserAddOutlined />}
                onClick={() => setOpenType("add")}
              >
                ADD
              </Button>
            </div>

            <Table
              rowKey={(record) => record.id}
              onRow={(record) => {
                console.log({ record });
                return {
                  onClick: () => {
                    // setFieldValues(record);
                    form.setFieldsValue({
                      name: record.name,
                      email: record.email,
                    });
                    setOpenType("edit");
                  },
                };
              }}
              columns={columns}
              dataSource={invitedUsers}
            />
          </div>
        ) : (
          <>
            <h2 className="text-center text-lg font-semibold text-blue-600">
              {openType == "add" ? "Add Member" : "Update Member"}
            </h2>
            <Form
              onFinish={handleSubmit}
              className="flex flex-col space-y-3"
              autoComplete="off"
              form={form}
            >
              <Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  {
                    min: 5,
                    message: "Name equal to 5 or more characters",
                  },
                ]}
                //initialValue={invitedUserName}
              >
                <Input placeholder="Enter the user's name" />
              </Item>
              <Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                //initialValue={invitedUserEmail}
              >
                <Input placeholder="Enter the user email" />
              </Item>

              <Button
                className="bg-blue-600 text-white flex justify-center items-center gap-1 py-5 text-lg"
                htmlType="submit"
                loading={loading}
                style={{ background: " rgb(37 99 235)" }}
              >
                {openType == "add" ? (
                  <div className="flex justify-center items-center gap-1">
                    <span>Send</span>{" "}
                    {/* <PaperAirplaneIcon width={20} className="-rotate-45" /> */}
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </Form>
          </>
        )}
      </div>
    </Modal>
  );
}

export default InviteModal;
