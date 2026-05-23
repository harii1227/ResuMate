import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BiodataData {
  id: string;
  titleName: string;
  updatedAt: string;
  personalDetails: {
    fullName: string;
    photoUrl: string;
    dob: string;
    timeOfBirth: string;
    placeOfBirth: string;
    rashi: string;
    nakshatra: string;
    height: string;
    weight: string;
    religion: string;
    caste: string;
    gotra: string;
    manglik: 'Yes' | 'No' | 'Anshik' | 'Don\'t Know' | '';
    education: string;
    occupation: string;
    salary: string;
    hobbies: string;
  };
  familyDetails: {
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    brothers: string;
    sisters: string;
    familyType: 'Joint' | 'Nuclear' | 'Extended' | '';
    familyValues: 'Traditional' | 'Moderate' | 'Liberal' | '';
  };
  contactDetails: {
    mobile: string;
    alternateMobile: string;
    email: string;
    address: string;
  };
  additionalInfo: {
    aboutMe: string;
    expectations: string;
    lifestyle: string;
    languagesKnown: string;
  };
  templateId: string;
  customization: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: 'sm' | 'md' | 'lg';
    spacing: 'compact' | 'comfortable' | 'loose';
    borderStyle: 'traditional' | 'royal' | 'minimal' | 'modern';
    cornerDecor: boolean;
    hiddenSections?: string[];
  };
}

export interface BiodataState {
  activeBiodata: BiodataData;
  drafts: BiodataData[];
}

const defaultBiodata: BiodataData = {
  id: 'default',
  titleName: 'My Marriage Biodata',
  updatedAt: new Date().toISOString(),
  personalDetails: {
    fullName: 'Raman Rajput',
    photoUrl: '',
    dob: '1995-11-24',
    timeOfBirth: '08:45 AM',
    placeOfBirth: 'New Delhi, India',
    rashi: 'Scorpio (Vrishchik)',
    nakshatra: 'Anuradha',
    height: '5 ft 10 in',
    weight: '74 kg',
    religion: 'Hindu',
    caste: 'Brahmin',
    gotra: 'Bharadwaj',
    manglik: 'No',
    education: 'MBA in Finance (IIM Bangalore)',
    occupation: 'Investment Banker at Goldman Sachs',
    salary: '₹22,00,000 Per Annum',
    hobbies: 'Reading Biography books, Playing Chess, Weekend Marathon Running',
  },
  familyDetails: {
    fatherName: 'Dr. Ramesh Rajput',
    fatherOccupation: 'Retired Professor (Delhi University)',
    motherName: 'Mrs. Sunita Rajput',
    motherOccupation: 'Homemaker',
    brothers: '1 Elder Brother (Married, Software Engineer in Canada)',
    sisters: 'None',
    familyType: 'Nuclear',
    familyValues: 'Moderate',
  },
  contactDetails: {
    mobile: '7324930925',
    alternateMobile: '+91 98765 01234',
    email: 'rs22201227@gmail.com',
    address: 'Flat 402, Green Glen Heights, Sector-3, Dwarka, New Delhi - 110075',
  },
  additionalInfo: {
    aboutMe: 'I am a down-to-earth, goal-oriented individual who values both modern principles and family traditions. I enjoy traveling, learning about investments, and spending quality time with family.',
    expectations: 'Looking for an educated, understanding, and warm-hearted partner who values family relationships and is career-oriented. Preferably from a similar cultural background.',
    lifestyle: 'Vegetarian, Non-smoker, Social Drinker',
    languagesKnown: 'Hindi, English, Punjabi',
  },
  templateId: 'traditional',
  customization: {
    primaryColor: '#b91c1c', // Red-700
    accentColor: '#d97706', // Amber-600
    fontFamily: 'font-serif',
    fontSize: 'md',
    spacing: 'comfortable',
    borderStyle: 'traditional',
    cornerDecor: true,
    hiddenSections: [],
  },
};

const getSavedDrafts = (): BiodataData[] => {
  try {
    const oldRaw = localStorage.getItem('resumecraft_biodata_drafts');
    const newRaw = localStorage.getItem('resumate_biodata_drafts');
    
    if (newRaw) {
      return JSON.parse(newRaw);
    } else if (oldRaw) {
      localStorage.setItem('resumate_biodata_drafts', oldRaw);
      localStorage.removeItem('resumecraft_biodata_drafts');
      return JSON.parse(oldRaw);
    }
    return [];
  } catch {
    return [];
  }
};

const initialState: BiodataState = {
  activeBiodata: defaultBiodata,
  drafts: getSavedDrafts(),
};

const biodataSlice = createSlice({
  name: 'biodata',
  initialState,
  reducers: {
    updatePersonalDetails(state, action: PayloadAction<Partial<BiodataData['personalDetails']>>) {
      state.activeBiodata.personalDetails = {
        ...state.activeBiodata.personalDetails,
        ...action.payload,
      };
      state.activeBiodata.updatedAt = new Date().toISOString();
    },
    updateFamilyDetails(state, action: PayloadAction<Partial<BiodataData['familyDetails']>>) {
      state.activeBiodata.familyDetails = {
        ...state.activeBiodata.familyDetails,
        ...action.payload,
      };
      state.activeBiodata.updatedAt = new Date().toISOString();
    },
    updateContactDetails(state, action: PayloadAction<Partial<BiodataData['contactDetails']>>) {
      state.activeBiodata.contactDetails = {
        ...state.activeBiodata.contactDetails,
        ...action.payload,
      };
      state.activeBiodata.updatedAt = new Date().toISOString();
    },
    updateAdditionalInfo(state, action: PayloadAction<Partial<BiodataData['additionalInfo']>>) {
      state.activeBiodata.additionalInfo = {
        ...state.activeBiodata.additionalInfo,
        ...action.payload,
      };
      state.activeBiodata.updatedAt = new Date().toISOString();
    },
    updateCustomization(state, action: PayloadAction<Partial<BiodataData['customization']>>) {
      state.activeBiodata.customization = {
        ...state.activeBiodata.customization,
        ...action.payload,
      };
    },
    setTemplateId(state, action: PayloadAction<string>) {
      state.activeBiodata.templateId = action.payload;
    },
    setActiveBiodata(state, action: PayloadAction<BiodataData>) {
      state.activeBiodata = action.payload;
    },
    loadDraft(state, action: PayloadAction<string>) {
      const draft = state.drafts.find((d) => d.id === action.payload);
      if (draft) {
        state.activeBiodata = draft;
      }
    },
    saveCurrentAsDraft(state, action: PayloadAction<string>) {
      const title = action.payload || state.activeBiodata.titleName;
      const isNew = state.activeBiodata.id === 'default' || !state.activeBiodata.id;
      
      const newDraft: BiodataData = {
        ...state.activeBiodata,
        id: isNew ? 'bio_' + Date.now().toString() : state.activeBiodata.id,
        titleName: title,
        updatedAt: new Date().toISOString(),
      };

      state.activeBiodata = newDraft;

      const existingIndex = state.drafts.findIndex((d) => d.id === newDraft.id);
      if (existingIndex > -1) {
        state.drafts[existingIndex] = newDraft;
      } else {
        state.drafts.push(newDraft);
      }
      localStorage.setItem('resumate_biodata_drafts', JSON.stringify(state.drafts));
    },
    deleteDraft(state, action: PayloadAction<string>) {
      state.drafts = state.drafts.filter((d) => d.id !== action.payload);
      localStorage.setItem('resumate_biodata_drafts', JSON.stringify(state.drafts));
    },
    createNewBiodata(state) {
      state.activeBiodata = {
        ...defaultBiodata,
        id: 'bio_' + Date.now().toString(),
        titleName: 'Untitled Biodata',
        updatedAt: new Date().toISOString(),
        personalDetails: {
          fullName: '',
          photoUrl: '',
          dob: '',
          timeOfBirth: '',
          placeOfBirth: '',
          rashi: '',
          nakshatra: '',
          height: '',
          weight: '',
          religion: '',
          caste: '',
          gotra: '',
          manglik: '',
          education: '',
          occupation: '',
          salary: '',
          hobbies: '',
        },
        familyDetails: {
          fatherName: '',
          fatherOccupation: '',
          motherName: '',
          motherOccupation: '',
          brothers: '',
          sisters: '',
          familyType: '',
          familyValues: '',
        },
        contactDetails: {
          mobile: '',
          alternateMobile: '',
          email: '',
          address: '',
        },
        additionalInfo: {
          aboutMe: '',
          expectations: '',
          lifestyle: '',
          languagesKnown: '',
        },
      };
    },
    toggleSectionVisibility(state, action: PayloadAction<string>) {
      const sectionId = action.payload;
      if (!state.activeBiodata.customization.hiddenSections) {
        state.activeBiodata.customization.hiddenSections = [];
      }
      const index = state.activeBiodata.customization.hiddenSections.indexOf(sectionId);
      if (index > -1) {
        state.activeBiodata.customization.hiddenSections.splice(index, 1);
      } else {
        state.activeBiodata.customization.hiddenSections.push(sectionId);
      }
    },
  },
});

export const {
  updatePersonalDetails,
  updateFamilyDetails,
  updateContactDetails,
  updateAdditionalInfo,
  updateCustomization,
  setTemplateId,
  setActiveBiodata,
  loadDraft,
  saveCurrentAsDraft,
  deleteDraft,
  createNewBiodata,
  toggleSectionVisibility,
} = biodataSlice.actions;

export default biodataSlice.reducer;
