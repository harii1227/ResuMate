import React from 'react';
import type { BiodataData } from '../redux/biodataSlice';

interface BiodataTemplateRendererProps {
  data: BiodataData;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export const BiodataTemplateRenderer: React.FC<BiodataTemplateRendererProps> = ({ data, targetRef }) => {
  const { personalDetails, familyDetails, contactDetails, additionalInfo, customization } = data;

  const fontClass = customization.fontFamily;
  const spacingClass =
    customization.spacing === 'compact'
      ? 'space-y-2'
      : customization.spacing === 'loose'
      ? 'space-y-5.5'
      : 'space-y-3.5';

  const rowSpacingClass =
    customization.spacing === 'compact'
      ? 'py-0.5'
      : customization.spacing === 'loose'
      ? 'py-1.5'
      : 'py-1';

  const textSizes = {
    sm: {
      title: 'text-xl md:text-2xl',
      h3: 'text-xs md:text-sm',
      label: 'text-[11px]',
      value: 'text-[11px]',
    },
    md: {
      title: 'text-2xl md:text-3xl',
      h3: 'text-sm md:text-base',
      label: 'text-xs md:text-sm',
      value: 'text-xs md:text-sm',
    },
    lg: {
      title: 'text-3xl md:text-4xl',
      h3: 'text-base md:text-lg',
      label: 'text-sm md:text-base',
      value: 'text-sm md:text-base',
    },
  }[customization.fontSize];

  // Component to render individual detail fields
  const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    if (!value) return null;
    return (
      <div className={`grid grid-cols-12 border-b border-slate-100 dark:border-slate-800 ${rowSpacingClass} items-start`}>
        <span className={`col-span-5 font-bold text-slate-500 text-left ${textSizes.label}`}>{label}</span>
        <span className={`col-span-7 text-slate-800 dark:text-slate-100 text-left font-medium ${textSizes.value}`}>{value}</span>
      </div>
    );
  };

  // SVGS & CULTURAL MOTIFS RENDERING
  const renderReligiousMotif = () => {
    if (!customization.cornerDecor) return null;
    
    switch (data.templateId) {
      // Golden Ganesha SVG for traditional styles
      case 'traditional':
      case 'southindian':
        return (
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
              {/* Abstract Golden Ganesha outline */}
              <path d="M50,15 C55,15 60,18 62,22 C64,26 63,30 61,33 C58,37 53,40 50,42 C51,45 53,48 55,51 C58,55 62,58 63,63 C64,68 62,73 58,76 C54,79 48,80 43,78 C38,76 35,71 34,66 C33,62 34,58 37,55 C40,52 44,50 45,46 C40,46 35,43 32,39 C29,35 29,30 32,26 C35,22 41,18 47,16 C48,15.5 49,15 50,15 Z" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M43,30 C45,28 55,28 57,30" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="50" cy="23" r="2" fill="#b91c1c" />
              <path d="M48,37 C42,40 40,45 42,50 C44,55 49,56 50,60" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        );
      
      // Royal Crown / Mandala symbol
      case 'royal':
      case 'premium':
        return (
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-9" viewBox="0 0 80 50" fill="none">
              <path d="M10,40 L20,15 L40,30 L60,15 L70,40 Z" stroke="#d97706" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="20" cy="12" r="3" fill="#d97706" />
              <circle cx="40" cy="27" r="3" fill="#d97706" />
              <circle cx="60" cy="12" r="3" fill="#d97706" />
              <path d="M5,42 L75,42" stroke="#d97706" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        );

      // Islamic Crescent & Star SVG
      case 'muslim':
        return (
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none">
              <path d="M35,12 A15,15 0 1,0 35,38 A18,18 0 1,1 35,12 Z" fill="#047857" />
              <polygon points="34,22 36,25 39,25 37,27 38,30 35,28 32,30 33,27 31,25 34,25" fill="#d97706"/>
            </svg>
          </div>
        );

      // Simple elegant floral vines divider
      default:
        return (
          <div className="flex justify-center mb-3">
            <svg className="w-32 h-6" viewBox="0 0 120 20" fill="none">
              <path d="M10,10 C30,15 50,5 60,10 C70,15 90,5 110,10" stroke="#cccccc" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="60" cy="10" r="3" fill={customization.primaryColor} />
              <path d="M45,8 C43,4 40,6 45,8 Z M75,12 C77,16 80,14 75,12 Z" fill="#cccccc"/>
            </svg>
          </div>
        );
    }
  };

  // SVGS FRAME DESIGN
  const renderTemplateBorderFrame = () => {
    switch (data.templateId) {
      // 1. TRADITIONAL HINDU (Double thin red-gold lines and intricate corner patterns)
      case 'traditional':
        return (
          <div className="absolute inset-0 border-[10px] border-red-700 m-2 p-1 pointer-events-none">
            <div className="absolute inset-0 border-2 border-amber-600 m-1" />
          </div>
        );

      // 3. ROYAL CRIMSON (Intricate gold palace arches enclosing the content)
      case 'royal':
        return (
          <div className="absolute inset-0 m-3 pointer-events-none">
            {/* Outline Arch frame */}
            <svg className="w-full h-full" viewBox="0 0 600 850" fill="none" preserveAspectRatio="none">
              <rect x="15" y="15" width="570" height="820" rx="10" stroke="#d97706" strokeWidth="3" />
              {/* Palace top dome arch outline */}
              <path d="M15,120 C150,110 200,40 300,40 C400,40 450,110 585,120" stroke="#d97706" strokeWidth="2.5" fill="none" />
              {/* Floral corners */}
              <path d="M15,50 L50,15" stroke="#d97706" strokeWidth="2" />
              <path d="M550,15 L585,50" stroke="#d97706" strokeWidth="2" />
            </svg>
          </div>
        );

      // 7. SOUTH INDIAN TEMPLE (Intricate silk zari saree border layout top & bottom)
      case 'southindian':
        return (
          <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex flex-col justify-between p-1">
            {/* Top Zari Border */}
            <div className="h-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 w-full flex items-center justify-around border-y border-red-700">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-red-700 rounded-full" />
              ))}
            </div>
            {/* Bottom Zari Border */}
            <div className="h-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 w-full flex items-center justify-around border-y border-red-700">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-red-700 rounded-full" />
              ))}
            </div>
          </div>
        );

      // 8. ISLAMIC GREEN (Star geometric motifs)
      case 'muslim':
        return (
          <div className="absolute inset-0 border-[8px] border-emerald-700 m-2 p-1 pointer-events-none">
            <div className="absolute inset-0 border border-amber-500 m-1" />
            {/* Decorative crescent corners */}
            <span className="absolute top-2 left-2 text-[10px] text-amber-500">🌙</span>
            <span className="absolute top-2 right-2 text-[10px] text-amber-500">🌙</span>
            <span className="absolute bottom-2 left-2 text-[10px] text-amber-500">🌙</span>
            <span className="absolute bottom-2 right-2 text-[10px] text-amber-500">🌙</span>
          </div>
        );

      // 9. PHOTO CENTRIC & PASTEL FLORAL (Watercolor leaf designs)
      case 'photocentric':
      case 'classic':
        return (
          <div className="absolute inset-0 pointer-events-none m-4 border border-slate-100">
            {/* Vine corners */}
            <svg className="absolute top-0 left-0 w-16 h-16 text-slate-300" viewBox="0 0 50 50" fill="currentColor">
              <path d="M0,0 C15,5 25,25 20,40 C18,30 10,18 0,10 Z" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-16 h-16 text-slate-300 rotate-180" viewBox="0 0 50 50" fill="currentColor">
              <path d="M0,0 C15,5 25,25 20,40 C18,30 10,18 0,10 Z" />
            </svg>
          </div>
        );

      // Default minimal thin line border
      default:
        return (
          <div className="absolute inset-0 border border-slate-200/80 m-4 pointer-events-none rounded-xl" />
        );
    }
  };

  // Base background style colors
  const backgroundThemeClasses = {
    traditional: 'bg-orange-50/15 dark:bg-slate-900',
    royal: 'bg-[#fffaf3] dark:bg-slate-950',
    southindian: 'bg-amber-50/10 dark:bg-slate-900',
    muslim: 'bg-emerald-50/5 dark:bg-slate-950',
    minimal: 'bg-white dark:bg-slate-900',
    modern: 'bg-gradient-to-b from-white to-slate-50/40 dark:from-slate-900 dark:to-slate-950',
  }[data.templateId] || 'bg-white dark:bg-slate-900';

  return (
    <div
      ref={targetRef}
      id="biodata-render-root"
      className={`w-full max-w-[750px] mx-auto shadow-2xl relative overflow-hidden transition-all print:border-none print:shadow-none ${fontClass} ${backgroundThemeClasses}`}
      style={{ padding: '24px' }}
    >
      {/* Background Frame SVG / Lines */}
      {renderTemplateBorderFrame()}

      {/* Main Inner wrapper */}
      <div className="relative z-10 px-4 md:px-8 py-6">
        
        {/* Religious motif at center top */}
        {renderReligiousMotif()}

        {/* Title Block */}
        <div className="text-center mb-4">
          <h1
            className={`font-black tracking-widest uppercase font-serif ${textSizes.title}`}
            style={{ color: customization.primaryColor }}
          >
            {data.templateId === 'traditional' ? 'BIODATA' : 'MARRIAGE BIODATA'}
          </h1>
          <div
            className="h-1 w-24 mx-auto my-2.5 rounded-full"
            style={{ backgroundColor: customization.primaryColor }}
          />
          {personalDetails.fullName && (
            <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight mt-1">{personalDetails.fullName}</h2>
          )}
        </div>

        {/* Matrimonial Profile Picture upload display */}
        {personalDetails.photoUrl && (
          <div className="flex justify-center mb-4">
            <div
              className="w-28 h-36 overflow-hidden bg-slate-50 dark:bg-slate-950 border-4 shadow-lg rounded"
              style={{ borderColor: customization.primaryColor }}
            >
              <img src={personalDetails.photoUrl} alt="Matrimonial Candidate" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Dynamic Detail grid spaces */}
        <div className={spacingClass}>
          
          {/* Section 1: Personal Particulars */}
          <section>
            <h3
              className={`font-bold border-b pb-1.5 mb-3 text-left uppercase tracking-widest ${textSizes.h3}`}
              style={{ color: customization.primaryColor, borderColor: `${customization.primaryColor}30` }}
            >
              Personal Particulars
            </h3>
            <div className="space-y-0.5">
              <DetailRow label="Date of Birth" value={personalDetails.dob} />
              {!(customization.hiddenSections || []).includes('horoscope') && (
                <>
                  {personalDetails.timeOfBirth && <DetailRow label="Time of Birth" value={personalDetails.timeOfBirth} />}
                  {personalDetails.placeOfBirth && <DetailRow label="Place of Birth" value={personalDetails.placeOfBirth} />}
                  {personalDetails.rashi && <DetailRow label="Rashi (Zodiac)" value={personalDetails.rashi} />}
                  {personalDetails.nakshatra && <DetailRow label="Nakshatra" value={personalDetails.nakshatra} />}
                </>
              )}
              <DetailRow label="Height" value={personalDetails.height} />
              {personalDetails.weight && <DetailRow label="Weight" value={personalDetails.weight} />}
              {!(customization.hiddenSections || []).includes('horoscope') && (
                <>
                  <DetailRow label="Religion" value={personalDetails.religion} />
                  {personalDetails.caste && <DetailRow label="Caste / Sub-Caste" value={personalDetails.caste} />}
                  {personalDetails.gotra && <DetailRow label="Gotra" value={personalDetails.gotra} />}
                  {personalDetails.manglik && <DetailRow label="Manglik Status" value={personalDetails.manglik} />}
                </>
              )}
              <DetailRow label="Education" value={personalDetails.education} />
              <DetailRow label="Profession" value={personalDetails.occupation} />
              {personalDetails.salary && <DetailRow label="Annual Income" value={personalDetails.salary} />}
              {personalDetails.hobbies && <DetailRow label="Hobbies & Interests" value={personalDetails.hobbies} />}
            </div>
          </section>

          {/* Section 2: Family Background */}
          {!(customization.hiddenSections || []).includes('family') && (familyDetails.fatherName || familyDetails.motherName) && (
            <section>
              <h3
                className={`font-bold border-b pb-1.5 mb-3 text-left uppercase tracking-widest ${textSizes.h3}`}
                style={{ color: customization.primaryColor, borderColor: `${customization.primaryColor}30` }}
              >
                Family Details
              </h3>
              <div className="space-y-0.5">
                <DetailRow label="Father's Name" value={familyDetails.fatherName} />
                {familyDetails.fatherOccupation && <DetailRow label="Father's Occupation" value={familyDetails.fatherOccupation} />}
                <DetailRow label="Mother's Name" value={familyDetails.motherName} />
                {familyDetails.motherOccupation && <DetailRow label="Mother's Occupation" value={familyDetails.motherOccupation} />}
                {familyDetails.brothers && <DetailRow label="Brothers" value={familyDetails.brothers} />}
                {familyDetails.sisters && <DetailRow label="Sisters" value={familyDetails.sisters} />}
                {familyDetails.familyType && <DetailRow label="Family Setup" value={`${familyDetails.familyType} Family`} />}
                {familyDetails.familyValues && <DetailRow label="Family Values" value={familyDetails.familyValues} />}
              </div>
            </section>
          )}

          {/* Section 3: Contacts */}
          {!(customization.hiddenSections || []).includes('contact') && (
            <section>
              <h3
                className={`font-bold border-b pb-1.5 mb-3 text-left uppercase tracking-widest ${textSizes.h3}`}
                style={{ color: customization.primaryColor, borderColor: `${customization.primaryColor}30` }}
              >
                Contact Information
              </h3>
              <div className="space-y-0.5">
                <DetailRow label="Mobile Number" value={contactDetails.mobile} />
                {contactDetails.alternateMobile && <DetailRow label="Alternate Mobile" value={contactDetails.alternateMobile} />}
                {contactDetails.email && <DetailRow label="Email Address" value={contactDetails.email} />}
                <DetailRow label="Residence Address" value={contactDetails.address} />
              </div>
            </section>
          )}

          {/* Section 4: Partner expectations & Self summary */}
          {!(customization.hiddenSections || []).includes('expectations') && (additionalInfo.aboutMe || additionalInfo.expectations || additionalInfo.languagesKnown) && (
            <section>
              <h3
                className={`font-bold border-b pb-1.5 mb-3 text-left uppercase tracking-widest ${textSizes.h3}`}
                style={{ color: customization.primaryColor, borderColor: `${customization.primaryColor}30` }}
              >
                Expectations & Profile
              </h3>
              <div className="space-y-4 text-left pt-2">
                {additionalInfo.aboutMe && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">About Me</h4>
                    <p className={`text-slate-650 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line mt-1 ${textSizes.value}`}>
                      {additionalInfo.aboutMe}
                    </p>
                  </div>
                )}
                {additionalInfo.expectations && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partner Expectations</h4>
                    <p className={`text-slate-650 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line mt-1 ${textSizes.value}`}>
                      {additionalInfo.expectations}
                    </p>
                  </div>
                )}
                {additionalInfo.languagesKnown && (
                  <div className="flex items-center text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Languages:</span>
                    <span className={`text-slate-800 dark:text-slate-200 font-semibold ${textSizes.value}`}>{additionalInfo.languagesKnown}</span>
                  </div>
                )}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
};
