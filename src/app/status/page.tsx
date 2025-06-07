// app/status/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// Ikon yang relevan dengan laundry
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'; // Untuk judul utama
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DryCleaningIcon from '@mui/icons-material/DryCleaning'; // Untuk proses cuci/setrika
import CheckroomIcon from '@mui/icons-material/Checkroom'; // Pakaian siap
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Untuk pengantaran
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // Untuk ID Transaksi
import InventoryIcon from '@mui/icons-material/Inventory'; // Fallback atau item

// Tipe data untuk langkah laundry
interface LaundryStep {
  label: string;
  timestamp?: string;
  notes?: string;
}

// Tipe data untuk detail laundry
interface LaundryDetails {
  orderId: string; // Bisa juga disebut Nomor Nota
  customerName: string;
  serviceType: 'Cuci Kering Setrika' | 'Cuci Kering Lipat' | 'Setrika Saja' | 'Layanan Kilat';
  itemsDescription?: string; // Deskripsi umum item, mis. "3 Kemeja, 2 Celana"
  weightKg?: number;
  totalAmount: number;
  paymentStatus: 'Lunas' | 'Belum Lunas';
  estimatedFinishDate?: string;
}

// Tipe data untuk status laundry keseluruhan
interface LaundryStatus {
  transactionId: string; // ID unik untuk tracking laundry
  currentStep: number; // index dari 'steps'
  isCompleted: boolean;
  isCancelled?: boolean;
  cancellationReason?: string;
  steps: LaundryStep[];
  details?: LaundryDetails;
}

// Daftar langkah-langkah progres laundry
const LAUNDRY_PROGRESS_STEPS: string[] = [
  'Pakaian Diterima',
  'Proses Pencucian',
  'Proses Pengeringan',
  'Proses Setrika',
  'Selesai & Siap Diambil',
  'Telah Diambil/Diantar',
];

// --- SIMULASI FUNGSI UNTUK FETCH DATA DARI DATABASE ---
const fetchLaundryStatusFromDB = async (
  transactionCode: string
): Promise<LaundryStatus | null> => {
  console.log(`Mencari status laundry untuk kode: ${transactionCode}`);
  // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi delay

  if (transactionCode === 'LDRY123') {
    return {
      transactionId: 'LDRY123',
      currentStep: 2, // 'Proses Pengeringan'
      isCompleted: false,
      steps: [
        { label: LAUNDRY_PROGRESS_STEPS[0], timestamp: '2025-05-28 09:00:00', notes: "Estimasi selesai 2 hari." },
        { label: LAUNDRY_PROGRESS_STEPS[1], timestamp: '2025-05-28 11:30:00' },
        { label: LAUNDRY_PROGRESS_STEPS[2], notes: "Sedang dikeringkan mesin." },
        { label: LAUNDRY_PROGRESS_STEPS[3] },
        { label: LAUNDRY_PROGRESS_STEPS[4] },
        { label: LAUNDRY_PROGRESS_STEPS[5] },
      ],
      details: {
        orderId: 'NOTA-001',
        customerName: 'Ibu Anisa',
        serviceType: 'Cuci Kering Setrika',
        itemsDescription: 'Pakaian sehari-hari campur',
        weightKg: 5.2,
        totalAmount: 52000,
        paymentStatus: 'Lunas',
        estimatedFinishDate: '30 Mei 2025, Sore',
      },
    };
  } else if (transactionCode === 'LDRY456') {
    return {
      transactionId: 'LDRY456',
      currentStep: 5, // 'Telah Diambil/Diantar'
      isCompleted: true,
      steps: [
        { label: LAUNDRY_PROGRESS_STEPS[0], timestamp: '2025-05-26 14:00:00' },
        { label: LAUNDRY_PROGRESS_STEPS[1], timestamp: '2025-05-26 16:00:00' },
        { label: LAUNDRY_PROGRESS_STEPS[2], timestamp: '2025-05-27 09:00:00' },
        { label: LAUNDRY_PROGRESS_STEPS[3], timestamp: '2025-05-27 13:00:00' },
        { label: LAUNDRY_PROGRESS_STEPS[4], timestamp: '2025-05-27 17:00:00', notes: "Siap diambil di rak A3" },
        { label: LAUNDRY_PROGRESS_STEPS[5], timestamp: '2025-05-28 10:00:00', notes: "Telah diambil oleh pelanggan." },
      ],
      details: {
        orderId: 'NOTA-002',
        customerName: 'Bapak Rudi',
        serviceType: 'Layanan Kilat',
        itemsDescription: '2 Jas, 1 Gaun',
        totalAmount: 75000,
        paymentStatus: 'Lunas',
      },
    };
  } else if (transactionCode === 'LDRY789') {
     return {
      transactionId: 'LDRY789',
      currentStep: 0, // 'Pakaian Diterima'
      isCompleted: false,
      isCancelled: true,
      cancellationReason: 'Pelanggan meminta pembatalan sebelum proses cuci.',
      steps: [
        { label: LAUNDRY_PROGRESS_STEPS[0], timestamp: '2025-05-28 08:00:00', notes: "Dibatalkan atas permintaan." },
        { label: LAUNDRY_PROGRESS_STEPS[1] },
        { label: LAUNDRY_PROGRESS_STEPS[2] },
        { label: LAUNDRY_PROGRESS_STEPS[3] },
        { label: LAUNDRY_PROGRESS_STEPS[4] },
        { label: LAUNDRY_PROGRESS_STEPS[5] },
      ],
      details: {
        orderId: 'NOTA-003',
        customerName: 'Ibu Citra',
        serviceType: 'Setrika Saja',
        itemsDescription: '1 keranjang pakaian',
        totalAmount: 30000,
        paymentStatus: 'Belum Lunas',
      },
    };
  }
  return null;
};
// --- AKHIR SIMULASI ---

function LaundryStatusDisplay() {
  const searchParams = useSearchParams();
  const transactionCode = searchParams.get('laundry'); // Ganti parameter ke 'laundry' atau biarkan 'transaksi'

  const [statusData, setStatusData] = useState<LaundryStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (transactionCode) {
      setIsLoading(true);
      setError(null);
      fetchLaundryStatusFromDB(transactionCode.toUpperCase())
        .then((data) => {
          if (data) {
            setStatusData(data);
          } else {
            setError(`Status untuk kode laundry "${transactionCode.toUpperCase()}" tidak ditemukan.`);
          }
        })
        .catch((err) => {
          console.error('Error fetching laundry status:', err);
          setError('Terjadi kesalahan saat mengambil status laundry. Mohon coba lagi.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError('Kode laundry tidak ditemukan di URL. Pastikan format URL adalah: /status?laundry=KODE_ANDA');
      setIsLoading(false);
    }
  }, [transactionCode]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)', pt: { xs: 10, md: 14 } }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Memuat status laundry...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 10, md: 14 }, mb: 4 }}>
        <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!statusData) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 10, md: 14 }, mb: 4 }}>
        <Alert severity="warning">Data status laundry tidak tersedia.</Alert>
      </Container>
    );
  }

  const getStepIcon = (stepIndex: number, currentStep: number, isCompleted: boolean, isCancelled?: boolean) => {
    if (stepIndex < currentStep || (isCompleted && stepIndex === currentStep && !isCancelled)) {
      return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
    if (stepIndex === currentStep && isCancelled) {
        return <ErrorOutlineIcon sx={{ color: 'error.main' }} />;
    }
    if (stepIndex === currentStep && !isCompleted && !isCancelled) {
      // Ikon spesifik untuk langkah laundry yang sedang berjalan
      if (LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Proses Pencucian' || LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Proses Setrika') {
        return <DryCleaningIcon sx={{ color: 'primary.main', animation: 'spin 2s linear infinite' }} />;
      }
      return <HourglassEmptyIcon sx={{ color: 'primary.main', animation: 'spin 2s linear infinite' }} />;
    }
    // Ikon untuk langkah mendatang atau setelah pembatalan
     if (LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Selesai & Siap Diambil' || LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Telah Diambil/Diantar') {
        return <CheckroomIcon sx={{ color: theme.palette.grey[400]}}/>;
    }
    return <InventoryIcon sx={{ color: theme.palette.grey[400]}} />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 8, sm: 10, md: 12 }, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Paper elevation={isMobile ? 2 : 3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: '12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocalLaundryServiceIcon color="primary" sx={{ fontSize: isMobile ? '2.5rem' : '3rem', mr: 1.5 }}/>
            <Typography variant={isMobile ? "h5" : "h4"} component="h1" fontWeight="bold">
            Status Laundry Anda
            </Typography>
        </Box>
        <Chip
          label={`No. Nota: ${statusData.transactionId}`} // Atau No. Transaksi / Order
          color="secondary" // Ubah warna chip jika mau
          variant="outlined"
          icon={<ReceiptLongIcon />}
          sx={{ mb: 3, fontSize: isMobile? '0.875rem' : '1rem', fontWeight: 500 }}
        />

        {statusData.isCancelled && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                <strong>Laundry Dibatalkan.</strong> {statusData.cancellationReason || "Tidak ada alasan spesifik."}
            </Alert>
        )}
        {statusData.details?.estimatedFinishDate && !statusData.isCompleted && !statusData.isCancelled && (
            <Alert severity="info" sx={{ mb:3, borderRadius: '8px'}}>
                Perkiraan Selesai: <strong>{statusData.details.estimatedFinishDate}</strong>
            </Alert>
        )}


        <Typography variant="h6" component="h2" gutterBottom fontWeight={500}>
          Proses Laundry:
        </Typography>
        <Stepper
          activeStep={statusData.isCancelled ? -1 : statusData.currentStep}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          alternativeLabel={!isMobile}
          sx={{ mb: 4,
            ...(isMobile && {
                '& .MuiStepConnector-line': {
                    minHeight: '45px',
                },
                 '& .MuiStepLabel-labelContainer': { // Agar note tidak terlalu mepet ikon
                    marginLeft: '8px',
                }
            })
          }}
        >
          {statusData.steps.map((step, index) => (
            <Step key={step.label} completed={index < statusData.currentStep || (statusData.isCompleted && index <= statusData.currentStep && !statusData.isCancelled)}>
              <StepLabel
                StepIconComponent={() => getStepIcon(index, statusData.currentStep, statusData.isCompleted, statusData.isCancelled && index === statusData.currentStep)}
                sx={isMobile ? { textAlign: 'left', alignItems: 'flex-start' } : {}}
                error={statusData.isCancelled && index === statusData.currentStep}
              >
                <Typography variant="subtitle1" fontWeight={index === statusData.currentStep && !statusData.isCompleted && !statusData.isCancelled ? "bold" : "normal"}>
                    {step.label}
                </Typography>
                {step.timestamp && (
                  <Typography variant="caption" display="block" color="text.secondary">
                    {new Date(step.timestamp).toLocaleString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                )}
                {step.notes && (
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{
                        color: (statusData.isCancelled && index === statusData.currentStep) ? 'error.dark' : 'info.dark',
                        mt: 0.5,
                        fontStyle: 'italic'
                    }}
                  >
                    {step.notes}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {statusData.details && (
          <>
            <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.12)' }} />
            <Typography variant="h6" component="h2" gutterBottom fontWeight={500}>
              Detail Laundry:
            </Typography>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: '8px' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Info Pelanggan & Layanan:</Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters>
                      <ListItemText primary="Nama Pelanggan" secondary={statusData.details.customerName} primaryTypographyProps={{fontWeight: 500}} />
                    </ListItem>
                     <ListItem disableGutters>
                      <ListItemText primary="Jenis Layanan" secondary={statusData.details.serviceType} primaryTypographyProps={{fontWeight: 500}}/>
                    </ListItem>
                    {statusData.details.itemsDescription && (
                      <ListItem disableGutters>
                        <ListItemText primary="Deskripsi Pakaian" secondary={statusData.details.itemsDescription} primaryTypographyProps={{fontWeight: 500}}/>
                      </ListItem>
                    )}
                    {typeof statusData.details.weightKg === 'number' && (
                      <ListItem disableGutters>
                        <ListItemText primary="Berat" secondary={`${statusData.details.weightKg} kg`} primaryTypographyProps={{fontWeight: 500}}/>
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: '8px' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Info Pembayaran:</Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters>
                        <ListItemText primary="Total Biaya" secondary={`Rp ${statusData.details.totalAmount.toLocaleString('id-ID')}`} primaryTypographyProps={{fontWeight: 500}}/>
                    </ListItem>
                    <ListItem disableGutters>
                       <ListItemText
                            primary="Status Pembayaran"
                            secondary={statusData.details.paymentStatus}
                            primaryTypographyProps={{fontWeight: 500}}
                            secondaryTypographyProps={{color: statusData.details.paymentStatus === 'Lunas' ? 'success.main' : 'error.main', fontWeight:'bold'}}
                        />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {statusData.isCompleted && !statusData.isCancelled &&(
          <Alert severity="success" sx={{ mt: 3, borderRadius: '8px' }} icon={<CheckCircleIcon />}>
            Laundry Anda telah selesai diproses dan siap diambil/telah diantar. Terima kasih!
          </Alert>
        )}
      </Paper>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default function StatusLaundryPage() { // Ganti nama Halaman utama juga
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)', pt: { xs: 10, md: 14 } }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Memuat...
        </Typography>
      </Box>
    }>
      <LaundryStatusDisplay />
    </Suspense>
  );
}