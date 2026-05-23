import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/Home';
import { ResumeTemplatesPage } from '../pages/ResumeTemplatesPage';
import { BiodataTemplatesPage } from '../pages/BiodataTemplatesPage';
import { ResumeBuilder } from '../pages/ResumeBuilder';
import { BiodataBuilder } from '../pages/BiodataBuilder';
import { DownloadsPage } from '../pages/DownloadsPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { SettingsPage } from '../pages/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="resume-templates" element={<ResumeTemplatesPage />} />
          <Route path="biodata-templates" element={<BiodataTemplatesPage />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="biodata-builder" element={<BiodataBuilder />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
