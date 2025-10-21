import json
import os
import re
from collections import defaultdict

# Library name mapping for consistency
LIBRARY_MAPPING = {
    'ScaLAPACK': 'ScaLAPACK',
    'LAPACK': 'LAPACK',
    'BLAS': 'BLAS',
    'MKL': 'Intel MKL',
    'cuBLAS': 'cuBLAS',
    'cuSOLVER': 'cuSOLVER',
    'cuSolverMp': 'cuSolverMp',
    'cuBLASMp': 'cuBLASMp',
    'PETSc': 'PETSc',
    'Trilinos': 'Trilinos',
    'MUMPS': 'MUMPS',
    'SuperLU': 'SuperLU',
    'SuperLU_DIST': 'SuperLU_DIST',
    'PARDISO': 'PARDISO',
    'PEXSI': 'PEXSI',
    'NTPoly': 'NTPoly',
    'CheSS': 'CheSS',
    'SLATE': 'SLATE',
    'DPLASMA': 'DPLASMA',
    'ELPA': 'ELPA',
    'CHOLMOD': 'CHOLMOD',
    'PaStiX': 'PaStiX',
    'SLEPc': 'SLEPc',
    'DLA-Future': 'DLA-Future',
    'PLASMA': 'PLASMA',
    'Ginkgo': 'Ginkgo',
    'ChASE': 'ChASE',
    'ELSI': 'ELSI',
    'Libint': 'Libint',
    'Libxc': 'Libxc',
    'cuSolver': 'cuSolver',
    'NTChem': 'NTChem',
    'Quantum ESPRESSO': 'Quantum ESPRESSO',
    'Yambo': 'Yambo',
    'libNEGF': 'libNEGF',
    'CP2K': 'CP2K',
    'SIESTA': 'SIESTA',
    'FHI-AIMS': 'FHI-AIMS',
    'CASTEP': 'CASTEP',
    'DFTB+': 'DFTB+',
    'Principle modes': 'Principle modes'
}

# Library categories
LIBRARY_CATEGORIES = {
    'Distributed Dense': ['ScaLAPACK', 'SLATE', 'DPLASMA', 'ELPA', 'DLA-Future'],
    'GPU Libraries': ['cuSolverMp', 'cuBLASMp', 'cuBLAS', 'cuSOLVER', 'cuSolver'],
    'Sparse Libraries': ['SuperLU', 'SuperLU_DIST', 'MUMPS', 'PARDISO', 'PEXSI', 'CHOLMOD', 'PaStiX'],
    'Eigenvalue Libraries': ['SLEPc', 'ChASE', 'ELPA', 'ELSI'],
    'General Purpose': ['LAPACK', 'BLAS', 'Intel MKL', 'PLASMA', 'Ginkgo'],
    'Specialized': ['NTPoly', 'CheSS', 'PETSc', 'Trilinos', 'Libint', 'Libxc'],
    'Applications': ['NTChem', 'Quantum ESPRESSO', 'Yambo', 'libNEGF', 'CP2K', 'SIESTA', 'FHI-AIMS', 'CASTEP', 'DFTB+', 'Principle modes']
}

def extract_libraries_from_file(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    filename = os.path.basename(filepath).replace('.json', '')
    app_name = data.get('library-name', filename)
    
    libraries_used = set()
    libraries_interested = set()
    
    # Search through all fields for library mentions
    for key, value in data.items():
        if isinstance(value, list):
            for item in value:
                if isinstance(item, str):
                    for lib_name, canonical_name in LIBRARY_MAPPING.items():
                        if lib_name in item:
                            # Determine if it's used or interested based on field name
                            if 'used' in key or 'current' in key:
                                libraries_used.add(canonical_name)
                            elif 'interest' in key or 'interested' in key:
                                libraries_interested.add(canonical_name)
                            else:
                                # Default to interested if unclear
                                libraries_interested.add(canonical_name)
        elif isinstance(value, str):
            for lib_name, canonical_name in LIBRARY_MAPPING.items():
                if lib_name in value:
                    if 'used' in key or 'current' in key:
                        libraries_used.add(canonical_name)
                    elif 'interest' in key or 'interested' in key:
                        libraries_interested.add(canonical_name)
                    else:
                        libraries_interested.add(canonical_name)
    
    return app_name, libraries_used, libraries_interested

def main():
    survey_dir = 'public/survey/nla-in-applications'
    library_data = defaultdict(lambda: {'used_by': set(), 'interested_by': set()})
    
    for filename in os.listdir(survey_dir):
        if filename.endswith('.json'):
            filepath = os.path.join(survey_dir, filename)
            app_name, used, interested = extract_libraries_from_file(filepath)
            
            for lib in used:
                library_data[lib]['used_by'].add(app_name)
            for lib in interested:
                library_data[lib]['interested_by'].add(app_name)
    
    # Print results
    print("Library Analysis Results:")
    print("=" * 50)
    
    for category, libraries in LIBRARY_CATEGORIES.items():
        print(f"\n{category}:")
        print("-" * 30)
        for lib in libraries:
            if lib in library_data:
                used_by = sorted(library_data[lib]['used_by'])
                interested_by = sorted(library_data[lib]['interested_by'])
                print(f"{lib}:")
                if used_by:
                    print(f"  Used by: {', '.join(used_by)}")
                if interested_by:
                    print(f"  Interested by: {', '.join(interested_by)}")
                print()

if __name__ == "__main__":
    main()
