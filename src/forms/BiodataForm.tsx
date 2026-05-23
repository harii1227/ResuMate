import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  updatePersonalDetails,
  updateFamilyDetails,
  updateContactDetails,
  updateAdditionalInfo,
  toggleSectionVisibility,
} from '../redux/biodataSlice';

export const BiodataForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const biodata = useAppSelector((state) => state.biodata.activeBiodata);

  const [activeTab, setActiveTab] = useState<'personal' | 'horoscope' | 'family' | 'contact' | 'expectations'>('personal');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updatePersonalDetails({ photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Scrollable Tab bar horizontal */}
      <div className="flex border-b border-slate-800 bg-slate-950 overflow-x-auto scrollbar-none">
        {(['personal', 'horoscope', 'family', 'contact', 'expectations'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[90px] px-3 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'border-violet-500 text-violet-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {tab === 'expectations' ? 'Expects' : tab}
          </button>
        ))}
      </div>

      {/* Editor panels container */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
        {/* PERSONAL DETAILS TAB */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={biodata.personalDetails.fullName}
                  onChange={(e) => dispatch(updatePersonalDetails({ fullName: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="Raman Rajput"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={biodata.personalDetails.dob}
                  onChange={(e) => dispatch(updatePersonalDetails({ dob: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Profile Photograph</label>
                <div className="flex items-center space-x-4">
                  {biodata.personalDetails.photoUrl && (
                    <img src={biodata.personalDetails.photoUrl} alt="Preview" className="w-12 h-16 object-cover border border-slate-700 rounded-lg" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                  />
                  {biodata.personalDetails.photoUrl && (
                    <button
                      type="button"
                      onClick={() => dispatch(updatePersonalDetails({ photoUrl: '' }))}
                      className="text-xs text-red-400 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Height</label>
                <input
                  type="text"
                  value={biodata.personalDetails.height}
                  onChange={(e) => dispatch(updatePersonalDetails({ height: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. 5 ft 10 in"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Weight</label>
                <input
                  type="text"
                  value={biodata.personalDetails.weight}
                  onChange={(e) => dispatch(updatePersonalDetails({ weight: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. 72 kg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Highest Education</label>
                <input
                  type="text"
                  value={biodata.personalDetails.education}
                  onChange={(e) => dispatch(updatePersonalDetails({ education: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. MBA in Finance"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Occupation / Profession</label>
                <input
                  type="text"
                  value={biodata.personalDetails.occupation}
                  onChange={(e) => dispatch(updatePersonalDetails({ occupation: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Finance Analyst at Goldman Sachs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Annual Salary</label>
                <input
                  type="text"
                  value={biodata.personalDetails.salary}
                  onChange={(e) => dispatch(updatePersonalDetails({ salary: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. ₹18,00,000 Per Annum"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Hobbies / Interests</label>
                <input
                  type="text"
                  value={biodata.personalDetails.hobbies}
                  onChange={(e) => dispatch(updatePersonalDetails({ hobbies: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Playing Cricket, Reading, Traveling"
                />
              </div>
            </div>
          </div>
        )}

        {/* HOROSCOPE / ASTRO TAB */}
        {activeTab === 'horoscope' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Horoscope & Astrology Details</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(biodata.customization.hiddenSections || []).includes('horoscope')}
                  onChange={() => dispatch(toggleSectionVisibility('horoscope'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-red-650 focus:ring-red-500 cursor-pointer"
                />
                <span>Include in Biodata</span>
              </label>
            </div>
            <div className={`space-y-4 ${(biodata.customization.hiddenSections || []).includes('horoscope') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Time of Birth</label>
                <input
                  type="text"
                  value={biodata.personalDetails.timeOfBirth}
                  onChange={(e) => dispatch(updatePersonalDetails({ timeOfBirth: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. 08:30 AM"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Place of Birth</label>
                <input
                  type="text"
                  value={biodata.personalDetails.placeOfBirth}
                  onChange={(e) => dispatch(updatePersonalDetails({ placeOfBirth: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Mumbai, Maharashtra"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Religion</label>
                <input
                  type="text"
                  value={biodata.personalDetails.religion}
                  onChange={(e) => dispatch(updatePersonalDetails({ religion: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Hindu"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Caste / Subcaste</label>
                <input
                  type="text"
                  value={biodata.personalDetails.caste}
                  onChange={(e) => dispatch(updatePersonalDetails({ caste: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Brahmin (Iyengar)"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Gotra</label>
                <input
                  type="text"
                  value={biodata.personalDetails.gotra}
                  onChange={(e) => dispatch(updatePersonalDetails({ gotra: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Kashyap"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Rashi</label>
                <input
                  type="text"
                  value={biodata.personalDetails.rashi}
                  onChange={(e) => dispatch(updatePersonalDetails({ rashi: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Gemini (Mithun)"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nakshatra</label>
                <input
                  type="text"
                  value={biodata.personalDetails.nakshatra}
                  onChange={(e) => dispatch(updatePersonalDetails({ nakshatra: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Rohini"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Manglik Status</label>
                <select
                  value={biodata.personalDetails.manglik}
                  onChange={(e) => dispatch(updatePersonalDetails({ manglik: e.target.value as any }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">Select Status</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Anshik">Anshik</option>
                  <option value="Don't Know">Don't Know</option>
                </select>
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Family Information</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(biodata.customization.hiddenSections || []).includes('family')}
                  onChange={() => dispatch(toggleSectionVisibility('family'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-red-650 focus:ring-red-500 cursor-pointer"
                />
                <span>Include in Biodata</span>
              </label>
            </div>
            <div className={`space-y-4 ${(biodata.customization.hiddenSections || []).includes('family') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Father's Name</label>
                <input
                  type="text"
                  value={biodata.familyDetails.fatherName}
                  onChange={(e) => dispatch(updateFamilyDetails({ fatherName: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Shri Dev Rajput"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Father's Occupation</label>
                <input
                  type="text"
                  value={biodata.familyDetails.fatherOccupation}
                  onChange={(e) => dispatch(updateFamilyDetails({ fatherOccupation: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Businessman"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Mother's Name</label>
                <input
                  type="text"
                  value={biodata.familyDetails.motherName}
                  onChange={(e) => dispatch(updateFamilyDetails({ motherName: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Shrimati Sunita Rajput"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Mother's Occupation</label>
                <input
                  type="text"
                  value={biodata.familyDetails.motherOccupation}
                  onChange={(e) => dispatch(updateFamilyDetails({ motherOccupation: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Homemaker"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Brothers</label>
                <input
                  type="text"
                  value={biodata.familyDetails.brothers}
                  onChange={(e) => dispatch(updateFamilyDetails({ brothers: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. 1 Younger Brother (student)"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Sisters</label>
                <input
                  type="text"
                  value={biodata.familyDetails.sisters}
                  onChange={(e) => dispatch(updateFamilyDetails({ sisters: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. 1 Elder Sister (Married)"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Family Type</label>
                <select
                  value={biodata.familyDetails.familyType}
                  onChange={(e) => dispatch(updateFamilyDetails({ familyType: e.target.value as any }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">Select Structure</option>
                  <option value="Nuclear">Nuclear</option>
                  <option value="Joint">Joint</option>
                  <option value="Extended">Extended</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Family Values</label>
                <select
                  value={biodata.familyDetails.familyValues}
                  onChange={(e) => dispatch(updateFamilyDetails({ familyValues: e.target.value as any }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">Select Values</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Liberal">Liberal</option>
                </select>
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Contact Details</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(biodata.customization.hiddenSections || []).includes('contact')}
                  onChange={() => dispatch(toggleSectionVisibility('contact'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-red-650 focus:ring-red-500 cursor-pointer"
                />
                <span>Include in Biodata</span>
              </label>
            </div>
            <div className={`space-y-4 ${(biodata.customization.hiddenSections || []).includes('contact') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={biodata.contactDetails.mobile}
                  onChange={(e) => dispatch(updateContactDetails({ mobile: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="7324930925"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Alternate Number</label>
                <input
                  type="text"
                  value={biodata.contactDetails.alternateMobile}
                  onChange={(e) => dispatch(updateContactDetails({ alternateMobile: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="7324930925"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={biodata.contactDetails.email}
                  onChange={(e) => dispatch(updateContactDetails({ email: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="rs22201227@gmail.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Residential Address</label>
                <textarea
                  value={biodata.contactDetails.address}
                  onChange={(e) => dispatch(updateContactDetails({ address: e.target.value }))}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                  placeholder="Full Residential Address..."
                />
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === 'expectations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Self Profile & Partner Expectations</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(biodata.customization.hiddenSections || []).includes('expectations')}
                  onChange={() => dispatch(toggleSectionVisibility('expectations'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-red-650 focus:ring-red-500 cursor-pointer"
                />
                <span>Include in Biodata</span>
              </label>
            </div>
            <div className={`space-y-4 ${(biodata.customization.hiddenSections || []).includes('expectations') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">About Me (Self Introduction)</label>
              <textarea
                value={biodata.additionalInfo.aboutMe}
                onChange={(e) => dispatch(updateAdditionalInfo({ aboutMe: e.target.value }))}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="Write a few lines summarizing your lifestyle and outlook..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Partner Expectations</label>
              <textarea
                value={biodata.additionalInfo.expectations}
                onChange={(e) => dispatch(updateAdditionalInfo({ expectations: e.target.value }))}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="Describe your expectations for a life partner (education, location, values)..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Languages Known</label>
              <input
                type="text"
                value={biodata.additionalInfo.languagesKnown}
                onChange={(e) => dispatch(updateAdditionalInfo({ languagesKnown: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                placeholder="e.g. Hindi, English, Gujarati"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Lifestyle Details</label>
              <input
                type="text"
                value={biodata.additionalInfo.lifestyle}
                onChange={(e) => dispatch(updateAdditionalInfo({ lifestyle: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                placeholder="e.g. Vegetarian, Non-smoker, Teetotaler"
              />
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
