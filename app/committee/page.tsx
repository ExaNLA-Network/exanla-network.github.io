'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';

// Renamed: Committee member expertise categories
const expertiseCategories = {
  NUMERICAL_LINEAR_ALGEBRA: 'Numerical Linear Algebra',
  HPC: 'High-Performance Computing',
  SCIENTIFIC_COMPUTING: 'Scientific Computing',
  SOFTWARE_DEVELOPMENT: 'Software Development',
  ALGORITHM_DEVELOPMENT: 'Algorithm Development',
  PARALLEL_PROGRAMMING: 'Parallel Programming',
  APPLIED_MATHEMATICS: 'Applied Mathematics',
  LOW_LEVEL_OPTIMIZATION: 'Low-level Optimization',
  AUTOMATION: 'Automation',
  ELECTRONIC_STRUCTURE_THEORY: 'Electronic Structure Theory/Calculation',
  INTERFACE_DEVELOPMENT: 'Interface Development',
  AI: 'AI',
};

// Define Working Groups
const WorkingGroups = {
  PERFORMANCE_PARALLELIZATION: "Performance and Parallelization",
  APPLICATION_FUNCTIONALITY: "Application Functionality",
  NLA_INTERFACE: "NLA Interface",
} as const;

export type WorkingGroupValue = typeof WorkingGroups[keyof typeof WorkingGroups];

interface CommitteeMember {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  bio?: string;
  image?: string;
  categories: (typeof expertiseCategories[keyof typeof expertiseCategories])[];
  workingGroups: WorkingGroupValue[];
}

// Committee members data
const committeeMembers: CommitteeMember[] = [
  {
    id: 'edoardo.di.napoli',
    name: 'Dr. Edoardo Di Napoli',
    title: 'Head of Sim&Data Lab Quantum Materials',
    affiliation: 'Jülich Supercomputing Center, FZJ, Germany',
    //bio: 'Dr. Edoardo Di Napoli is the head of the Simulation and Data Lab Quantum Materials @ JSC. Dr. Di Napoli interests range from mathematical modeling to numerical linear algebra and computational physics with a special focus of enabling high-performance large scale quantum mechanical simulations. His work is quite interdisciplinary in nature encompassing technical knowledge in parallel programming, to algorithm optimization applied to code development and code modernization.',
    image: '/committee/avatar/edoardo.di.napoli.png',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.APPLIED_MATHEMATICS],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION, WorkingGroups.APPLICATION_FUNCTIONALITY, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'xinzhe.wu',
    name: 'Dr. Xinzhe Wu',
    title: 'Senior Scientific Researcher',
    affiliation: 'Jülich Supercomputing Center, FZJ, Germany',
    bio: 'Dr. Xinzhe Wu is specializing in numerical linear algebra and high-performance computing. His research focuses on subspace methods for solving eigenvalue problems, with expertise in parallel matrix operations, task-based programming, and the application of machine learning in materials science.',
    image: '/committee/avatar/xinzhe.wu.jpeg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION, WorkingGroups.APPLICATION_FUNCTIONALITY, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'fabio.affinito',
    name: 'Dr. Fabio Affinito',
    title: 'Head of application support team',
    affiliation: 'CINECA, Italy',
    //bio: 'To be updated',
    //image: '/committee/avatar/fabio.affinito.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'hartwig.anzt',
    name: 'Prof. Hartwig Anzt',
    title: 'Professor',
    affiliation: 'TU Munich, Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/hartwig.anzt.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.APPLIED_MATHEMATICS, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'paolo.bientinesi',
    name: 'Prof. Paolo Bientinesi',
    title: 'Professor, Director',
    affiliation: 'Umeå University, Sweden',
    //bio: 'To be updated',
    //image: '/committee/avatar/paolo.bientinesi.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.AUTOMATION],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'volker.blum',
    name: 'Prof. Volker Blum',
    title: 'Associate Professor',
    affiliation: 'Duke University, USA',
    //bio: 'To be updated',
    //image: '/committee/avatar/volker.blum.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.ELECTRONIC_STRUCTURE_THEORY],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'alfredo.buttari',
    name: 'Dr. Alfredo Buttari',
    title: 'Research Director',
    affiliation: 'CNRS, IRIT, France',
    //bio: 'To be updated',
    //image: '/committee/avatar/alfredo.buttari.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.ALGORITHM_DEVELOPMENT],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'alfredo.correa',
    name: 'Dr. Alfredo A. Correa',
    title: 'Group Leader, Quantum Simulations Group, Physics Division',
    affiliation: 'Lawrence Livermore National Laboratory, USA',
    bio: 'Alfredo A. Correa is a Staff Scientist at Lawrence Livermore National Laboratory. His research focuses on the application, theoretical development, and software engineering of first-principles methods. These methods are used to describe matter under extreme conditions, including equations of state, as well as non-equilibrium and non-adiabatic coupled electron-ion quantum dynamics. Alfredo earned his Bachelor’s degree in Physics from the Balseiro Institute in Argentina and completed his Ph.D. in Physics at the University of California, Berkeley, in 2008. Following a postdoctoral position at Stanford University, he joined the Physics Division at Lawrence Livermore National Laboratory (LLNL) as a Lawrence Fellow in 2009. Since 2022, Alfredo has served as the Group Leader of the Quantum Simulations Group at LLNL. Alfredo is currently Thrust Leader, Software Manager at the “Center for Non-Perturbative Studies of Functional Materials under Non-Equilibrium Conditions” where he develops code for massively parallel MPI-interconnected GPU-based computers. He is a member of the C++ Standards Committee and a contributor to the MPI Forum.',
    image: '/committee/avatar/alfredo.correa.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.APPLIED_MATHEMATICS, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.INTERFACE_DEVELOPMENT],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'davor.davidovic',
    name: 'Dr. Davor Davidovic',
    title: 'Senior research associate',
    affiliation: 'Rudjer Boskovic Institute, Croatia',
    //bio: 'To be updated',
    //image: '/committee/avatar/davor.davidovic.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'william.dawson',
    name: 'Dr. William Dawson',
    title: 'Research Scientist',
    affiliation: 'RIKEN Center for Computational Science, Japan',
    //bio: 'To be updated',
    //image: '/committee/avatar/william.dawson.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'pietro.delugas',
    name: 'Dr. Pietro Delugas',
    title: 'Research Software Engineer',
    affiliation: 'SISSA, Italy',
    //bio: 'To be updated',
    //image: '/committee/avatar/pietro.delugas.jpg',
    categories: [expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.ELECTRONIC_STRUCTURE_THEORY],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'andrea.ferretti',
    name: 'Dr. Andrea Ferretti',
    title: 'Senior Researcher',
    affiliation: 'CNR, Istituto Nanoscienze, Italy',
    //bio: 'To be updated',
    //image: '/committee/avatar/andrea.ferretti.jpg',
    categories: [expertiseCategories.SCIENTIFIC_COMPUTING],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'takeshi.fukaya',
    name: 'Dr. Takeshi Fukaya',
    title: 'Associate Professor',
    affiliation: 'Hokkaido University, Japan',
    //bio: 'To be updated',
    //image: '/committee/avatar/takeshi.fukaya.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'mark.gates',
    name: 'Dr. Mark Gates',
    title: 'Research Assistant Professor',
    affiliation: 'University of Tennessee, Knoxville, USA',
    //bio: 'To be updated',
    //image: '/committee/avatar/mark.gates.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'alberto.garcia',
    name: 'Dr. Alberto Garcia',
    title: 'Staff Researcher',
    affiliation: 'Institut de Ciencia de Materials de Barcelona (ICMAB-CSIC), Spain',
    //bio: 'To be updated',
    //image: '/committee/avatar/alberto.garcia.jpg',
    categories: [expertiseCategories.SCIENTIFIC_COMPUTING],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'luigi.genovese',
    name: 'Dr. Luigi Genovese',
    title: 'Researcher',
    affiliation: 'Atomistic Simulation Laboratory - CEA Grenoble, France',
    //bio: 'To be updated',
    //image: '/committee/avatar/luigi.genovese.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY, WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'andras.herten',
    name: 'Dr. Andreas Herten',
    title: 'Joint-head of Division Novel System Architecture Design',
    affiliation: 'Jülich Supercomputing Centre, FZJ, Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/andreas.herten.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'ben.hourahine',
    name: 'Dr. Ben Hourahine',
    title: 'Senior Lecturer',
    affiliation: 'University of Strathclyde, UK',
    //bio: 'To be updated',
    //image: '/committee/avatar/ben.hourahine.jpg',
    categories: [expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION, WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'toshiyuki.imamura',
    name: 'Dr. Toshiyuki Imamura',
    title: 'Team Leader',
    affiliation: 'RIKEN Center for Computational Science, Japan',
    //bio: 'To be updated',
    //image: '/committee/avatar/toshiyuki.imamura.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'anonymous.member.1',
    name: 'Anonymous Member',
    title: 'Committee Member',
    affiliation: 'Anonymous',
    image: '/committee/avatar/anonymous.png',
    categories: [expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [],
  },
  {
    id: 'andreas.kleefeld',
    name: 'Prof. Andreas Kleefeld',
    title: 'Professor',
    affiliation: 'Jülich Supercomputing Centre, FZJ, Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/andreas.kleefeld.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.APPLIED_MATHEMATICS],
    workingGroups: [WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'hemanth.kolla',
    name: 'Dr. Hemanth Kolla',
    title: 'Principal Member of Technical Staff',
    affiliation: 'Sandia National Laboratories, USA',
    //bio: 'To be updated',
    //image: '/committee/avatar/hemanth.kolla.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.APPLIED_MATHEMATICS, expertiseCategories.SCIENTIFIC_COMPUTING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'thomas.kuehne',
    name: 'Dr. Thomas Kühne',
    title: 'Director of CASUS',
    affiliation: 'HZDR/CASUS, Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/thomas.kuehne.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.SCIENTIFIC_COMPUTING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION, WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'piotr.luszczek',
    name: 'Dr. Piotr Luszczek',
    title: 'Research Staff',
    affiliation: 'MIT Lincoln Lab, USA',
    //bio: 'To be updated',
    image: '/committee/avatar/piotr_luszczek.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'andreas.marek',
    name: 'Dr. Andreas Marek',
    title: 'Head of AI and HPDA division; Head of ELPA development',
    affiliation: 'Max-Planck Computing and Data Facility (MPCDF), Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/andreas.marek.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING, expertiseCategories.SCIENTIFIC_COMPUTING, expertiseCategories.AI],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'stepan.nassyr',
    name: 'Dr. Stepan Nassyr',
    title: 'Researcher',
    affiliation: 'Jülich Supercomputing Centre, FZJ, Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/stepan.nassyr.jpg',
    categories: [expertiseCategories.LOW_LEVEL_OPTIMIZATION, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'matt.probert',
    name: 'Prof. Matt Probert',
    title: 'Professor of Computational Physics',
    affiliation: 'University of York, UK',
    //bio: 'To be updated',
    //image: '/committee/avatar/matt.probert.jpg',
    categories: [expertiseCategories.HPC, expertiseCategories.SCIENTIFIC_COMPUTING],
    workingGroups: [WorkingGroups.NLA_INTERFACE],
  },
  {
    id: 'jose.roman',
    name: 'Prof. Jose E. Roman',
    title: 'Professor',
    affiliation: 'Universitat Politecnica de Valencia, Spain',
    //bio: 'To be updated',
    //image: '/committee/avatar/jose.roman.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT, expertiseCategories.PARALLEL_PROGRAMMING],
    workingGroups: [WorkingGroups.APPLICATION_FUNCTIONALITY],
  },
  {
    id: 'raffaele.solca',
    name: 'Dr. Raffaele Solcà',
    title: 'Research Software Engineer',
    affiliation: 'ETH Zurich, CSCS, Switzerland',
    //bio: 'To be updated',
    //image: '/committee/avatar/raffaele.solca.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.SOFTWARE_DEVELOPMENT],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  },
  {
    id: 'robert.speck',
    name: 'Dr. Robert Speck',
    title: 'Deputy director of JSC, head of the division Mathematics and Education',
    affiliation: 'Jülich Supercomputing Centre, FZJ, Germany',
    //bio: 'To be updated',
    //image: '/committee/avatar/robert.speck.jpg',
    categories: [expertiseCategories.ALGORITHM_DEVELOPMENT, expertiseCategories.SOFTWARE_DEVELOPMENT],
    workingGroups: [],
  },
  {
    id: 'rio.yokota',
    name: 'Prof. Rio Yokota',
    title: 'Professor',
    affiliation: 'Institute of Science Tokyo, Japan',
    //bio: 'To be updated',
    //image: '/committee/avatar/rio.yokota.jpg',
    categories: [expertiseCategories.NUMERICAL_LINEAR_ALGEBRA, expertiseCategories.HPC, expertiseCategories.ALGORITHM_DEVELOPMENT],
    workingGroups: [WorkingGroups.PERFORMANCE_PARALLELIZATION],
  }
];

// Corrected: Renamed original 'categories' to 'expertiseCategories' here as well
const getWorkingGroupStyle = () => {
  // Use lighter gray and smaller font for content text
  return 'text-gray-600 text-[11px]';
};

// Helper function to extract family name for sorting
const getFamilyNameForSort = (name: string, id: string): string => {
  // Explicit overrides for specific individuals based on ID for positioning
  if (id === 'edoardo.di.napoli') return '!aaaaaaaaedi napoli'; // Prefix to ensure it's first before Wu
  if (id === 'xinzhe.wu') return '!aaaaaaabxinzhe wu';   // Prefix to ensure it's second
  
  // For anonymous member, sort them towards the end of the alphabetical list
  if (id === 'anonymous.member.1') return 'zzzzzzmember';

  // General case: try to extract family name from the 'name' string
  const cleanedName = name.replace(/^(Dr\.|Prof\.|Prof\. Dr\.)\s+/i, '');  // Remove titles at the start
  
  const nameParts = cleanedName.split(' ').filter(part => part.trim() !== ''); // Split and remove empty parts

  if (nameParts.length === 0) return ''; // Should not happen with valid names

  let lastNameCandidate = nameParts[nameParts.length - 1];

  // Handle common multipart last names like "Di Stefano", "Van Der Beek"
  if (nameParts.length > 1) {
    const secondToLastNameInitial = nameParts[nameParts.length - 2];
    const secondToLastNameLower = secondToLastNameInitial.toLowerCase();
    const commonParticles = ['di', 'de', 'van', 'von', 'della', 'le', 'la', 'del'];
    // Ensure the particle is not just an initial (e.g., "E.")
    if (commonParticles.includes(secondToLastNameLower) && secondToLastNameInitial.length > 1 && secondToLastNameInitial[1] !== '.') {
      lastNameCandidate = secondToLastNameInitial + ' ' + lastNameCandidate;
    }
  }
  return lastNameCandidate.toLowerCase();
};

// Add ReadMore component
interface ReadMoreProps {
  text: string;
  maxLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength = 300 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <p className="text-sm text-gray-200 mb-4 leading-relaxed bg-[#002D4D] p-3 rounded-md">{text}</p>;
  }

  return (
    <div className="text-sm text-gray-200 mb-4 leading-relaxed bg-[#002D4D] p-3 rounded-md">
      <p className={isExpanded ? '' : 'line-clamp-5'}>
        {text}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 font-medium mt-2 focus:outline-none"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

export default function Committee() {
  const [selectedWorkingGroups, setSelectedWorkingGroups] = useState<WorkingGroupValue[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleWorkingGroupToggle = (group: WorkingGroupValue) => {
    setSelectedWorkingGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  const clearWorkingGroupFilters = () => {
    setSelectedWorkingGroups([]);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const allWorkingGroups = Object.values(WorkingGroups);

  const filteredAndSortedMembers = useMemo(() => {
    let processedMembers = [...committeeMembers];

    if (selectedWorkingGroups.length > 0) {
      processedMembers = processedMembers.filter(member =>
        selectedWorkingGroups.every(filterGroup => member.workingGroups.includes(filterGroup))
      );
    }

    processedMembers.sort((a, b) => {
      const familyNameA = getFamilyNameForSort(a.name, a.id);
      const familyNameB = getFamilyNameForSort(b.name, b.id);

      // Special IDs for Di Napoli and Wu ensure they are always at the top
      // The prefixes in getFamilyNameForSort handle their fixed positions.
      // For Di Napoli: '!aaaaaaaaedi napoli'
      // For Wu: '!aaaaaaabxinzhe wu'
      // Others will not have '!' prefix, sorting them after.
      
      const comparison = familyNameA.localeCompare(familyNameB);

      // If one of them is a special prefixed name, the direct localeCompare is enough
      // as '!...' will sort before regular names.
      // The sortOrder ('asc'/'desc') should only apply to the non-prefixed names (the "rest")
      // or more simply, reverse the comparison for all if 'desc', special names stay on top.

      // If both are special (e.g. comparing Di Napoli with Wu), localeCompare handles it.
      // If one is special and other is not, localeCompare handles it.
      // If neither is special, localeCompare sorts them alphabetically by family name.

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return processedMembers;
  }, [selectedWorkingGroups, sortOrder]);

  // Expertise distribution calculation (should use all members, not filtered)
  const expertiseCounts = Object.values(expertiseCategories).reduce((acc, categoryName) => {
    acc[categoryName] = 0;
    return acc;
  }, {} as Record<typeof expertiseCategories[keyof typeof expertiseCategories], number>);

  committeeMembers.forEach(member => {
    member.categories.forEach(category => {
      if (expertiseCounts.hasOwnProperty(category)) {
        expertiseCounts[category]++;
      }
    });
  });

  const expertiseDistribution = Object.entries(expertiseCounts)
    .map(([name, count]) => ({ name, count }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Meet the Committee</h1>
          <p className="mt-4 text-xl text-gray-600">
            Dedicated experts driving the ExaNLA project forward.
          </p>
        </div>

        {/* Filter and Sort UI for Working Groups */}
        <div className="mb-10 p-6 bg-white rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Filter by Working Group:</h3>
              <div className="flex flex-wrap gap-3">
                {allWorkingGroups.map(group => (
                  <button
                    key={group}
                    onClick={() => handleWorkingGroupToggle(group)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-150 ease-in-out border-2 
                                ${selectedWorkingGroups.includes(group)
                                  ? `${getWorkingGroupStyle().replace('text-', 'border-').replace('-600', '-300')} ${getWorkingGroupStyle()}`
                                  : `bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400`}`}
                  >
                    {group} {selectedWorkingGroups.includes(group) ? '✓' : ''}
                  </button>
                ))}
              </div>
              {selectedWorkingGroups.length > 0 && (
                <button
                  onClick={clearWorkingGroupFilters}
                  className="mt-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-150"
                >
                  Clear Working Group Filters
                </button>
              )}
            </div>
            <div className="md:col-span-1 flex flex-col items-start md:items-end">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sort by Name:</h3>
              <button
                onClick={toggleSortOrder}
                className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {sortOrder === 'asc' ? 'Name: A-Z' : 'Name: Z-A'}
                <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Committee Member Cards */}
        {filteredAndSortedMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedMembers.map((member) => (
              <div key={member.id} className="bg-[#003D66] rounded-xl shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  {member.image ? (
                    <div className="mx-auto mb-6 h-40 w-40 relative rounded-full overflow-hidden shadow-lg ring-4 ring-white ring-opacity-50">
                      <Image src={member.image} alt={member.name} fill sizes="160px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="mx-auto mb-6 h-40 w-40 relative rounded-full overflow-hidden shadow-lg ring-4 ring-white ring-opacity-50 bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {member.name
                          .replace(/^(Dr\.|Prof\.|Prof\. Dr\.)\s+/i, '')
                          .split(' ')
                          .map(word => word[0])
                          .join('')}
                      </span>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white text-center">{member.name}</h2>
                  <p className="text-center text-gray-200 font-medium">{member.title}</p>
                  <p className="text-center text-sm text-gray-300 mb-4">{member.affiliation}</p>
                  
                  {member.bio && member.bio !== 'To be updated' && (
                    <ReadMore text={member.bio} />
                  )}

                  {/* Display Working Groups */}
                  {member.workingGroups.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Working Groups:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.workingGroups.map(wg => (
                          <span key={wg} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-800">
                            {wg}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display Expertise Categories */}
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.categories.map(category => (
                        <span key={category} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-800">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No committee members match the current filters.</p>
          </div>
        )}

        {/* Expertise Distribution Section (remains unchanged, uses all members) */}
        <div className="mt-20 pt-12 border-t border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Overall Expertise Distribution</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {expertiseDistribution.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-1">{item.count}</p>
                <p className="text-sm text-gray-500">{item.count === 1 ? 'member' : 'members'}</p>
            </div>
          ))}
          </div>
        </div>

      </div>
    </div>
  );
} 
