// app/privacy-policy/page.tsx
import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import {
  Policy,
  Info,
  Security,
  Dns,
  Share,
  Lock,
  ContactMail,
  Update,
  ChildCare
} from '@mui/icons-material';

// Helper component untuk konsistensi judul
const SectionTitle = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 3 }}>
    {icon}
    <Typography variant="h5" component="h2" fontWeight="bold" sx={{ ml: 1.5 }}>
      {text}
    </Typography>
  </Box>
);

export default function PrivacyPolicyPage() {
  const effectiveDate = "June 26, 2025"; // TODO: Change to your effective date
  const developerName = "SIKASIR LAUNDRY DEV"; // TODO: Change to your name
  const contactEmail = "support@sikasirlaundry.web.id"; // TODO: Change to your email
  const websiteUrl = "https://sikasirlaundry.web.id/"; 

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 5 }, borderRadius: '12px' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Policy color="primary" sx={{ fontSize: 60 }} />
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            For SIKASIR LAUNDRY
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Effective Date: {effectiveDate}
          </Typography>
        </Box>

        {/* PERBAIKAN: Mengganti " dengan &quot; */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          Thank you for using SIKASIR LAUNDRY (&quot;the Application&quot;), a Point of Sale (POS) application designed to assist with your laundry business operations. This Privacy Policy explains how we ({developerName}) collect, use, and protect your information when you use our Application. By using the Application, you agree to the collection and use of information in accordance with this policy.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* --- 1. Information We Collect --- */}
        <section>
          <SectionTitle icon={<Info color="action" />} text="1. Information We Collect" />
          <Typography variant="body1" paragraph>
            To provide and improve our services, we collect several types of information from you:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="a. Data You Provide Directly:" 
                secondary={
                  "User Account Information (Owner & Cashier), Your Customer Information, Transaction Data, and Stock & Expense Data."
                }
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="b. Data Collected Automatically:" 
                secondary={
                  "Device Information (hardware model, OS version) for compatibility and technical support, and Usage Data (Log Data) for analytics and service improvement."
                }
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
          </List>
        </section>

        {/* --- 2. How We Use Your Information --- */}
        <section>
          <SectionTitle icon={<Dns color="action" />} text="2. How We Use Your Information" />
          <Typography variant="body1" paragraph>
            We use the collected information for various purposes:
          </Typography>
           <List dense>
              <ListItem>To provide and manage the Application&apos;s core functions (processing orders, managing customers, generating reports).</ListItem>
              <ListItem>To facilitate communication, such as sending digital receipts to your customers via third-party services like WhatsApp at your command.</ListItem>
              <ListItem>To respond to your inquiries, feedback, or requests for support.</ListItem>
              <ListItem>To analyze usage data to identify trends, improve functionality, and enhance user experience.</ListItem>
              <ListItem>To protect the security of your account and prevent fraudulent activities.</ListItem>
           </List>
        </section>

        {/* --- 3. Data Sharing and Disclosure --- */}
        <section>
          <SectionTitle icon={<Share color="action" />} text="3. Data Sharing and Disclosure" />
          <Typography variant="body1" paragraph>
            We take your data privacy very seriously. We will not sell or rent your personal information to third parties. We only share your information in the following situations:
          </Typography>
          <List dense>
              <ListItem><strong>Service Providers:</strong> We use reliable third-party services like Google Firebase (Firestore, Authentication) to securely store and manage your data.</ListItem>
              <ListItem><strong>Payment Processors:</strong> If you use payment features, transaction information will be shared with payment service providers (e.g., Midtrans) to process payments. Their privacy practices are governed by their own privacy policies.</ListItem>
              <ListItem><strong>Legal Obligations:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</ListItem>
           </List>
        </section>

        {/* --- 4. Data Security --- */}
        <section>
          <SectionTitle icon={<Security color="action" />} text="4. Data Security" />
           <Typography variant="body1" paragraph>
            The security of your data is our priority. We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Data is stored on secure Firebase servers, and sensitive data such as passwords are encrypted. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure.
          </Typography>
        </section>

        {/* --- 5. Application Permissions --- */}
        <section>
          <SectionTitle icon={<Lock color="action" />} text="5. Application Permissions" />
          <Typography variant="body1" paragraph>
            Our Application may request the following permissions on your device:
          </Typography>
           <List dense>
              <ListItem><strong>Storage:</strong> Required to save exported files, such as reports in Excel format.</ListItem>
              <ListItem><strong>Bluetooth:</strong> Required to connect with thermal printers for printing receipts.</ListItem>
           </List>
            <Typography variant="body1" paragraph>
            We will only use these permissions for the stated functionalities and will not access your personal data outside the scope of these functions.
          </Typography>
        </section>
        
        {/* --- 6. Children's Privacy --- */}
        <section>
          {/* PERBAIKAN: Mengganti ' dengan &apos; */}
          <SectionTitle icon={<ChildCare color="action" />} text="6. Children&apos;s Privacy" />
           <Typography variant="body1" paragraph>
            Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
          </Typography>
        </section>
        
        {/* --- 7. Changes to This Privacy Policy --- */}
        <section>
          <SectionTitle icon={<Update color="action" />} text="7. Changes to This Privacy Policy" />
           <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </Typography>
        </section>

        {/* --- 8. Contact Us --- */}
        <section>
          <SectionTitle icon={<ContactMail color="action" />} text="8. Contact Us" />
          <Typography variant="body1" paragraph>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
          </Typography>
          <List dense>
              <ListItem><strong>Email:</strong> {contactEmail}</ListItem>
              <ListItem><strong>Website:</strong> {websiteUrl}</ListItem>
           </List>
        </section>

      </Paper>
    </Container>
  );
}
