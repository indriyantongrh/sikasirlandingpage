// "use client";

// import React, { useEffect, useState, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Paper,
//   Box,
//   Stepper,
//   Step,
//   StepLabel,
//   Alert,
//   Chip,
//   Grid,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import DryCleaningIcon from '@mui/icons-material/DryCleaning';
// import CheckroomIcon from '@mui/icons-material/Checkroom';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// // --- Konfigurasi dan Inisialisasi Firebase ---
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore, collection, query, where, getDocs, limit, Timestamp } from "firebase/firestore";

// // TODO: GANTI DENGAN KREDENSIAL PROYEK FIREBASE ANDA
// const firebaseConfig = {
//   apiKey: "AIzaSyD9sgDL4BXnCqK1CLb53ENCOSD8FjpsTXU",
//   authDomain: "kasirlaundryapps.firebaseapp.com",
//   projectId: "kasirlaundryapps",
//   // storageBucket: "your-project-id.appspot.com",
//   // messagingSenderId: "123456789012",
//   // appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxxxxxx"
// };

// // Inisialisasi Firebase App dan Firestore
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);
// // --- Akhir Konfigurasi Firebase ---


// // Tipe data untuk langkah laundry
// interface LaundryStep {
//   label: string;
//   timestamp?: string;
//   notes?: string;
// }

// // Tipe data untuk detail laundry
// interface LaundryDetails {
//   orderId: string;
//   customerName: string;
//   itemsDescription?: string;
//   totalAmount: number;
//   paymentStatus: 'Lunas' | 'Belum Lunas';
//   estimatedFinishDate?: string;
// }

// // Tipe data untuk status laundry keseluruhan
// interface LaundryStatus {
//   transactionId: string;
//   currentStep: number;
//   isCompleted: boolean;
//   isCancelled?: boolean;
//   cancellationReason?: string;
//   steps: LaundryStep[];
//   details?: LaundryDetails;
// }

// // Daftar langkah-langkah progres laundry (sesuaikan dengan nilai di Firestore)
// const LAUNDRY_PROGRESS_STEPS: string[] = [
//   'Baru',
//   'Proses Pencucian',
//   'Proses Pengeringan',
//   'Proses Setrika',
//   'Selesai & Siap Diambil',
//   'Telah Diambil',
// ];

// // --- Fungsi untuk Fetch Data dari Firestore ---
// const fetchLaundryStatusFromDB = async (
//   transactionCode: string
// ): Promise<LaundryStatus | null> => {
//   console.log(`Mencari di Firestore untuk nomorOrder: ${transactionCode}`);

//   const q = query(
//     collection(db, "orders"), // Nama koleksi di Firestore
//     where("nomorOrder", "==", transactionCode), // Nama field untuk nomor order
//     limit(1)
//   );

//   const querySnapshot = await getDocs(q);

//   if (querySnapshot.empty) {
//     console.log("Dokumen tidak ditemukan.");
//     return null;
//   }

//   const docSnap = querySnapshot.docs[0];
//   const data = docSnap.data();

//   const statusOrder = data.statusOrder || 'Baru';
//   const currentStepIndex = LAUNDRY_PROGRESS_STEPS.indexOf(statusOrder);

//   const steps: LaundryStep[] = LAUNDRY_PROGRESS_STEPS.map((stepLabel, index) => {
//       if (currentStepIndex > index) {
//         return { label: stepLabel, timestamp: (data.createdAt as Timestamp).toDate().toISOString() };
//       }
//       if (currentStepIndex === index) {
//         return { label: stepLabel, timestamp: (data.updatedAt as Timestamp).toDate().toISOString() };
//       }
//       return { label: stepLabel };
//   });

//   const laundryStatus: LaundryStatus = {
//     transactionId: data.nomorOrder,
//     currentStep: currentStepIndex !== -1 ? currentStepIndex : 0,
//     isCompleted: data.statusOrder === 'Telah Diambil',
//     isCancelled: data.statusOrder === 'Dibatalkan',
//     cancellationReason: data.cancellationReason,
//     steps: steps,
//     details: {
//       orderId: data.nomorOrder,
//       customerName: data.namaPelanggan,
//       itemsDescription: (data.items as any[]).map(item => `${item.namaLayanan} (${item.kuantitas} ${item.satuan})`).join(', '),
//       totalAmount: data.totalHarga,
//       paymentStatus: data.statusPembayaran,
//       estimatedFinishDate: data.estimasiSelesai ? (data.estimasiSelesai as Timestamp).toDate().toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "Belum ditentukan",
//     }
//   };

//   return laundryStatus;
// };
// // --- Akhir Fungsi Firestore ---

// function LaundryStatusDisplay() {
//   const searchParams = useSearchParams();
//   const transactionCode = searchParams.get('laundry');

//   const [statusData, setStatusData] = useState<LaundryStatus | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const transactionId = transactionCode?.toUpperCase();
//     if (transactionId) {
//       setIsLoading(true);
//       setError(null);
//       fetchLaundryStatusFromDB(transactionId)
//         .then((data) => {
//           if (data) {
//             setStatusData(data);
//           } else {
//             setError(`Status untuk kode laundry "${transactionId}" tidak ditemukan.`);
//           }
//         })
//         .catch((err) => {
//           console.error('Error fetching laundry status:', err);
//           setError('Terjadi kesalahan saat mengambil status laundry. Mohon coba lagi.');
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       setError('Kode laundry tidak ditemukan di URL. Pastikan format URL adalah: /status?laundry=KODE_ANDA');
//       setIsLoading(false);
//     }
//   }, [transactionCode]);
  
//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Memuat status laundry...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="md" sx={{ mt: { xs: 10, md: 14 }, mb: 4 }}>
//         <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />}>
//           {error}
//         </Alert>
//       </Container>
//     );
//   }

//   if (!statusData) {
//     return (
//       <Container maxWidth="md" sx={{ mt: { xs: 10, md: 14 }, mb: 4 }}>
//         <Alert severity="warning">Data status laundry tidak tersedia.</Alert>
//       </Container>
//     );
//   }

//   const getStepIcon = (stepIndex: number, currentStep: number, isCompleted: boolean, isCancelled?: boolean) => {
//     if (stepIndex < currentStep || (isCompleted && stepIndex <= currentStep && !isCancelled)) {
//       return <CheckCircleIcon sx={{ color: 'success.main' }} />;
//     }
//     if (stepIndex === currentStep && isCancelled) {
//         return <ErrorOutlineIcon sx={{ color: 'error.main' }} />;
//     }
//     if (stepIndex === currentStep && !isCompleted && !isCancelled) {
//       if (LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Proses Pencucian' || LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Proses Setrika') {
//         return <DryCleaningIcon sx={{ color: 'primary.main', animation: 'spin 2s linear infinite' }} />;
//       }
//       return <HourglassEmptyIcon sx={{ color: 'primary.main', animation: 'spin 2s linear infinite' }} />;
//     }
//     if (LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Selesai & Siap Diambil' || LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Telah Diambil') {
//         return <CheckroomIcon sx={{ color: theme.palette.grey[400]}}/>;
//     }
//     return <InventoryIcon sx={{ color: theme.palette.grey[400]}} />;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: { xs: 8, sm: 10, md: 12 }, mb: 4, px: { xs: 2, sm: 3 } }}>
//       <Paper elevation={isMobile ? 2 : 3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: '12px' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <LocalLaundryServiceIcon color="primary" sx={{ fontSize: isMobile ? '2.5rem' : '3rem', mr: 1.5 }}/>
//             <Typography variant={isMobile ? "h5" : "h4"} component="h1" fontWeight="bold">
//             Status Laundry Anda
//             </Typography>
//         </Box>
//         <Chip
//           label={`No. Nota: ${statusData.transactionId}`}
//           color="secondary"
//           variant="outlined"
//           icon={<ReceiptLongIcon />}
//           sx={{ mb: 3, fontSize: isMobile? '0.875rem' : '1rem', fontWeight: 500 }}
//         />

//         {statusData.isCancelled && (
//             <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
//                 <strong>Laundry Dibatalkan.</strong> {statusData.cancellationReason || "Tidak ada alasan spesifik."}
//             </Alert>
//         )}
//         {statusData.details?.estimatedFinishDate && !statusData.isCompleted && !statusData.isCancelled && (
//             <Alert severity="info" sx={{ mb:3, borderRadius: '8px'}}>
//                 Perkiraan Selesai: <strong>{statusData.details.estimatedFinishDate}</strong>
//             </Alert>
//         )}

//         <Typography variant="h6" component="h2" gutterBottom fontWeight={500}>
//           Proses Laundry:
//         </Typography>
//         <Stepper
//           activeStep={statusData.isCancelled ? -1 : statusData.currentStep}
//           orientation={isMobile ? 'vertical' : 'horizontal'}
//           alternativeLabel={!isMobile}
//           sx={{ mb: 4,
//             ...(isMobile && {
//                 '& .MuiStepConnector-line': { minHeight: '45px' },
//                  '& .MuiStepLabel-labelContainer': { marginLeft: '8px' }
//             })
//           }}
//         >
//           {statusData.steps.map((step, index) => (
//             <Step key={step.label} completed={index < statusData.currentStep || (statusData.isCompleted && index <= statusData.currentStep && !statusData.isCancelled)}>
//               <StepLabel
//                 StepIconComponent={() => getStepIcon(index, statusData.currentStep, statusData.isCompleted, statusData.isCancelled && index === statusData.currentStep)}
//                 sx={isMobile ? { textAlign: 'left', alignItems: 'flex-start' } : {}}
//                 error={statusData.isCancelled && index === statusData.currentStep}
//               >
//                 <Typography variant="subtitle1" fontWeight={index === statusData.currentStep && !statusData.isCompleted && !statusData.isCancelled ? "bold" : "normal"}>
//                     {step.label}
//                 </Typography>
//                 {step.timestamp && (
//                   <Typography variant="caption" display="block" color="text.secondary">
//                     {new Date(step.timestamp).toLocaleString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
//                   </Typography>
//                 )}
//                 {step.notes && (
//                   <Typography variant="caption" display="block" sx={{ color: (statusData.isCancelled && index === statusData.currentStep) ? 'error.dark' : 'info.dark', mt: 0.5, fontStyle: 'italic' }}>
//                     {step.notes}
//                   </Typography>
//                 )}
//               </StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {statusData.details && (
//           <>
//             <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.12)' }} />
//             <Typography variant="h6" component="h2" gutterBottom fontWeight={500}>
//               Detail Laundry:
//             </Typography>
//             <Grid container spacing={isMobile ? 2 : 3}>
//               <Grid xs={12} md={6}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: '8px' }}>
//                   <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Info Pelanggan & Layanan:</Typography>
//                   <List dense disablePadding>
//                     <ListItem disableGutters>
//                       <ListItemText primary="Nama Pelanggan" secondary={statusData.details.customerName} primaryTypographyProps={{fontWeight: 500}} />
//                     </ListItem>
//                     {statusData.details.itemsDescription && (
//                       <ListItem disableGutters>
//                         <ListItemText primary="Deskripsi Pakaian" secondary={statusData.details.itemsDescription} primaryTypographyProps={{fontWeight: 500}}/>
//                       </ListItem>
//                     )}
//                   </List>
//                 </Paper>
//               </Grid>
//               <Grid xs={12} md={6}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: '8px' }}>
//                   <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Info Pembayaran:</Typography>
//                   <List dense disablePadding>
//                     <ListItem disableGutters>
//                         <ListItemText primary="Total Biaya" secondary={`Rp ${statusData.details.totalAmount.toLocaleString('id-ID')}`} primaryTypographyProps={{fontWeight: 500}}/>
//                     </ListItem>
//                     <ListItem disableGutters>
//                        <ListItemText
//                             primary="Status Pembayaran"
//                             secondary={statusData.details.paymentStatus}
//                             primaryTypographyProps={{fontWeight: 500}}
//                             secondaryTypographyProps={{color: statusData.details.paymentStatus === 'Lunas' ? 'success.main' : 'error.main', fontWeight:'bold'}}
//                         />
//                     </ListItem>
//                   </List>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </>
//         )}

//         {statusData.isCompleted && !statusData.isCancelled &&(
//           <Alert severity="success" sx={{ mt: 3, borderRadius: '8px' }} icon={<CheckCircleIcon />}>
//             Laundry Anda telah selesai diproses dan siap diambil/telah diantar. Terima kasih!
//           </Alert>
//         )}
//       </Paper>
//       <style jsx global>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </Container>
//   );
// }

// export default function StatusLaundryPage() {
//   return (
//     <Suspense fallback={
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Memuat...
//         </Typography>
//       </Box>
//     }>
//       <LaundryStatusDisplay />
//     </Suspense>
//   );
// }

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
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import InventoryIcon from '@mui/icons-material/Inventory';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// --- Konfigurasi dan Inisialisasi Firebase ---
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, limit, Timestamp } from "firebase/firestore";

// TODO: GANTI DENGAN KREDENSIAL PROYEK FIREBASE ANDA
const firebaseConfig = {
  apiKey: "AIzaSyD9sgDL4BXnCqK1CLb53ENCOSD8FjpsTXU",
  authDomain: "kasirlaundryapps.firebaseapp.com",
  projectId: "kasirlaundryapps",
};

// Inisialisasi Firebase App dan Firestore
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// --- Akhir Konfigurasi Firebase ---


// Tipe data untuk langkah laundry
interface LaundryStep {
  label: string;
  timestamp?: string;
  notes?: string;
}

// Tipe data untuk detail laundry
interface LaundryDetails {
  orderId: string;
  customerName: string;
  itemsDescription?: string;
  totalAmount: number;
  paymentStatus: 'Lunas' | 'Belum Lunas';
  estimatedFinishDate?: string;
}

// --- Menambahkan interface untuk item di dalam order ---
interface OrderItem {
  namaLayanan: string;
  kuantitas: number;
  satuan: string;
  // Tambahkan field lain dari item jika perlu
}

// Tipe data untuk status laundry keseluruhan
interface LaundryStatus {
  transactionId: string;
  currentStep: number;
  isCompleted: boolean;
  isCancelled?: boolean;
  cancellationReason?: string;
  steps: LaundryStep[];
  details?: LaundryDetails;
}

// Daftar langkah-langkah progres laundry (sesuaikan dengan nilai di Firestore)
const LAUNDRY_PROGRESS_STEPS: string[] = [
  'Baru',
  'Proses Pencucian',
  'Proses Pengeringan',
  'Proses Setrika',
  'Selesai & Siap Diambil',
  'Telah Diambil',
];

// --- Fungsi untuk Fetch Data dari Firestore ---
const fetchLaundryStatusFromDB = async (
  transactionCode: string
): Promise<LaundryStatus | null> => {
  console.log(`Mencari di Firestore untuk nomorOrder: ${transactionCode}`);

  const q = query(
    collection(db, "orders"), // Nama koleksi di Firestore
    where("nomorOrder", "==", transactionCode), // Nama field untuk nomor order
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Dokumen tidak ditemukan.");
    return null;
  }

  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();

  const statusOrder = data.statusOrder || 'Baru';
  const currentStepIndex = LAUNDRY_PROGRESS_STEPS.indexOf(statusOrder);

  const steps: LaundryStep[] = LAUNDRY_PROGRESS_STEPS.map((stepLabel, index) => {
      if (currentStepIndex > index) {
        return { label: stepLabel, timestamp: (data.createdAt as Timestamp).toDate().toISOString() };
      }
      if (currentStepIndex === index) {
        return { label: stepLabel, timestamp: (data.updatedAt as Timestamp).toDate().toISOString() };
      }
      return { label: stepLabel };
  });

  const laundryStatus: LaundryStatus = {
    transactionId: data.nomorOrder,
    currentStep: currentStepIndex !== -1 ? currentStepIndex : 0,
    isCompleted: data.statusOrder === 'Telah Diambil',
    isCancelled: data.statusOrder === 'Dibatalkan',
    cancellationReason: data.cancellationReason,
    steps: steps,
    details: {
      orderId: data.nomorOrder,
      customerName: data.namaPelanggan,
      itemsDescription: (data.items as OrderItem[]).map(item => `${item.namaLayanan} (${item.kuantitas} ${item.satuan})`).join(', '),
      totalAmount: data.totalHarga,
      paymentStatus: data.statusPembayaran,
      estimatedFinishDate: data.estimasiSelesai ? (data.estimasiSelesai as Timestamp).toDate().toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "Belum ditentukan",
    }
  };

  return laundryStatus;
};
// --- Akhir Fungsi Firestore ---

function LaundryStatusDisplay() {
  const searchParams = useSearchParams();
  const transactionCode = searchParams.get('laundry');

  const [statusData, setStatusData] = useState<LaundryStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const transactionId = transactionCode?.toUpperCase();
    if (transactionId) {
      setIsLoading(true);
      setError(null);
      fetchLaundryStatusFromDB(transactionId)
        .then((data) => {
          if (data) {
            setStatusData(data);
          } else {
            setError(`Status untuk kode laundry "${transactionId}" tidak ditemukan.`);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
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
    if (stepIndex < currentStep || (isCompleted && stepIndex <= currentStep && !isCancelled)) {
      return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
    if (stepIndex === currentStep && isCancelled) {
        return <ErrorOutlineIcon sx={{ color: 'error.main' }} />;
    }
    if (stepIndex === currentStep && !isCompleted && !isCancelled) {
      if (LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Proses Pencucian' || LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Proses Setrika') {
        return <DryCleaningIcon sx={{ color: 'primary.main', animation: 'spin 2s linear infinite' }} />;
      }
      return <HourglassEmptyIcon sx={{ color: 'primary.main', animation: 'spin 2s linear infinite' }} />;
    }
    if (LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Selesai & Siap Diambil' || LAUNDRY_PROGRESS_STEPS[stepIndex] === 'Telah Diambil') {
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
          label={`No. Nota: ${statusData.transactionId}`}
          color="secondary"
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
                '& .MuiStepConnector-line': { minHeight: '45px' },
                 '& .MuiStepLabel-labelContainer': { marginLeft: '8px' }
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
                  <Typography variant="caption" display="block" sx={{ color: (statusData.isCancelled && index === statusData.currentStep) ? 'error.dark' : 'info.dark', mt: 0.5, fontStyle: 'italic' }}>
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
              {/* PERBAIKAN: Menambahkan prop 'item' kembali */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: '8px' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Info Pelanggan & Layanan:</Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters>
                      <ListItemText primary="Nama Pelanggan" secondary={statusData.details.customerName} primaryTypographyProps={{fontWeight: 500}} />
                    </ListItem>
                    {statusData.details.itemsDescription && (
                      <ListItem disableGutters>
                        <ListItemText primary="Deskripsi Pakaian" secondary={statusData.details.itemsDescription} primaryTypographyProps={{fontWeight: 500}}/>
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
              {/* PERBAIKAN: Menambahkan prop 'item' kembali */}
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

export default function StatusLaundryPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
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