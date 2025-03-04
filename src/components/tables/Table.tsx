import React, { useState, useEffect } from "react";
import { fetchEmployees } from "../../services/api";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Avatar,
  Box,
  useMediaQuery
} from "@mui/material";
import { formatDate, formatPhoneInternational } from "../../utils/format";

interface Employee {
  id: number;
  name: string;
  job: string;
  admissionDate: string;
  phone: string;
  image: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filtered, setFiltered] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta modo mobile

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data: Employee[] = await fetchEmployees();
        if (Array.isArray(data)) {
          setEmployees(data);
          setFiltered(data);
        } else {
          console.error("Dados da API não são um array", data);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    if (Array.isArray(employees)) {
      setFiltered(
        employees.filter((emp) =>
          [emp.name, emp.job, emp.phone]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(search.toLowerCase()))
        )
      );
    }
  }, [search, employees]);

  return (
    <Box bgcolor="gainsboro" p={2}>
      <Box display="flex" justifyContent={isMobile ? "center" : "space-between"} alignItems={isMobile ? "center" : "center"} flexDirection={isMobile ? "column" : "row"} mx={isMobile ? 0 : 33} mt={5}>
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems={isMobile ? "center" : "flex-start"} >
          <Typography variant="h5" fontWeight="bold" padding={2} justifyContent={isMobile ? 'space-between' : 'space-around'} textAlign={isMobile ? "center" : "left"}>
            Funcionários
          </Typography>
        </Box>
        <TextField
          label="Pesquisar"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: isMobile ? "90%" : "300px", bgcolor: "white", ml: isMobile ? 0 : 2, m: isMobile ? 2 : 2 }}
        />
      </Box>
      {!isMobile ? (
        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
          <MuiTable>
            <TableHead>
              <TableRow sx={{ backgroundColor: "blue" }}>
                <TableCell sx={{ color: "white" }}>FOTO</TableCell>
                <TableCell sx={{ color: "white" }}>NOME</TableCell>
                <TableCell sx={{ color: "white" }}>CARGO</TableCell>
                <TableCell sx={{ color: "white" }}>DATA DE ADMISSÃO</TableCell>
                <TableCell sx={{ color: "white" }}>TELEFONE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Avatar src={employee.image} alt={employee.name} />
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.job}</TableCell>
                    <TableCell>{employee.admissionDate ? formatDate(employee.admissionDate) : "00/00/0000"}</TableCell>
                    <TableCell>{formatPhoneInternational(employee.phone)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Nenhum funcionário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
      ) : (
        <Paper sx={{ maxWidth: 400, margin: "auto" }}>
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" fontWeight="bold" sx={{ backgroundColor: "blue", color: "white", p: 1 }}>
              FOTO &nbsp;&nbsp; NOME
            </Typography>
            {filtered.length > 0 ? (
              filtered.map((employee) => (
                <Box
                  key={employee.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid #ddd"
                  p={1}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar src={employee.image} alt={employee.name} sx={{ width: 40, height: 40, marginRight: 1 }} />
                    <Typography>{employee.name}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>▼</Typography>
                </Box>
              ))
            ) : (
              <Typography textAlign="center" mt={2}>
                Nenhum funcionário encontrado
              </Typography>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default EmployeeList;
