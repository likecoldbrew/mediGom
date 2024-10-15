import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Container,
} from "@mui/material";
import {
  Person,
  Mail,
  Phone,
  Room,
  Today,
  EditCalendar,
  Work,
  EmojiEvents,
  ChromeReaderMode,
} from "@mui/icons-material";

export default function UserDetail() {
  const { userNo } = useParams(); // URL에서 userId 가져오기
  const id = parseInt(userNo);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);

  // API 호출
  useEffect(() => {
    fetchDetail();
    fetchMedicalRecords();
  }, []);

  const fetchDetail = async () => {
    try {
      const response = await fetch(`/api/users/${id}`); // Spring Boot 서버에서 데이터 가져오기
      const data = await response.json();
      setUsers(data.user); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch(`/api/medical_record`); // Spring Boot 서버에서 데이터 가져오기
      const data = await response.json();
      setRecords(data); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //console.log(users);
  console.log(records);

  const rrn = users?.userRrn || ""; // Optional chaining으로 user.userRrn 확인
  const formattedRrn =
    rrn.length >= 8 ? `${rrn.slice(0, 8)}${"*".repeat(rrn.length - 8)}` : rrn; // 길이가 9 미만일 경우 원래 문자열 반환

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {[users].map((user) => (
        <Card key={user.userNo} sx={{ mb: 6 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ width: 80, height: 80 }} src="/placeholder.svg">
                {user.userId}
              </Avatar>
            }
            title={<Typography variant="h4">{user.userName}</Typography>}
            subheader={
              <Typography variant="h6">
                {user.admin == 2 ? "관리자" : null}
              </Typography>
            }
          />
          <CardContent>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", minWidth: "45%" }}
              >
                <Person sx={{ mr: 1 }} />
                <Typography>{formattedRrn}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", minWidth: "45%" }}
              >
                <Phone sx={{ mr: 1 }} />
                <Typography>{user.phone}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", minWidth: "45%" }}
              >
                <Mail sx={{ mr: 1 }} />
                <Typography>{user.email}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", minWidth: "45%" }}
              >
                <Room sx={{ mr: 1 }} />
                <Typography>
                  {user.userAdd} {user.userAdd2}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", minWidth: "45%" }}
              >
                <Today sx={{ mr: 1 }} />
                <Typography>
                  Joined{" "}
                  {user.createAt
                    ? format(user.createAt, "yyyy.MM.dd HH:SS:ss")
                    : null}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", minWidth: "45%" }}
              >
                <EditCalendar sx={{ mr: 1 }} />
                <Typography>
                  Updated{" "}
                  {user.updateAt
                    ? format(user.updateAt, "yyyy.MM.dd HH:SS:ss")
                    : null}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <Box sx={{ p: 2 }}>
            <Button variant="contained" fullWidth>
              Edit Profile
            </Button>
          </Box>
        </Card>
      ))}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {[
          {
            icon: <Work />,
            title: "예약 목록",
            value: "12",
            subtitle: "Active projects",
          },
          {
            icon: <ChromeReaderMode />,
            title: "진료 목록",
            value: "8",
            subtitle: "Team members",
          },
          {
            icon: <ChromeReaderMode />,
            title: "처방 목록",
            value: "4/5",
            subtitle: "Completed this quarter",
          },
          {
            icon: <EmojiEvents />,
            title: "작성 글 목록",
            value: "7",
            subtitle: "Earned this year",
          },
          {
            icon: <EmojiEvents />,
            title: "서류 출력 기록",
            value: "7",
            subtitle: "Earned this year",
          },
          {
            icon: <EmojiEvents />,
            title: "입원 내역",
            value: "7",
            subtitle: "Earned this year",
          },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              flexGrow: 1,
              flexBasis: "calc(50% - 16px)",
              minWidth: "250px",
            }}
          >
            <CardHeader
              avatar={item.icon}
              title={<Typography variant="h6">{item.title}</Typography>}
            />
            <CardContent>
              <Typography variant="h4">{item.value}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.subtitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
