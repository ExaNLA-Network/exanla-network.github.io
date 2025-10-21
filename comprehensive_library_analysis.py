import json
import os
import re
from collections import defaultdict

# Comprehensive library name patterns and mappings
LIBRARY_PATTERNS = {
    # Distributed Dense Libraries
    'ScaLAPACK': ['ScaLAPACK', 'scalapack', 'SCALAPACK'],
    'LAPACK': ['LAPACK', 'lapack', 'Lapack'],
    'BLAS': ['BLAS', 'blas', 'Blas'],
    'SLATE': ['SLATE', 'slate', 'Slate'],
    'DPLASMA': ['DPLASMA', 'dplasma', 'DPlasma'],
    'ELPA': ['ELPA', 'elpa', 'Elpa'],
    'DLA-Future': ['DLA-Future', 'dla-future', 'DLA_Future', 'dla_future'],
    
    # GPU Libraries
    'cuSolverMp': ['cuSolverMp', 'cusolvermp', 'CUSOLVERMP'],
    'cuBLASMp': ['cuBLASMp', 'cublasmp', 'CUBLASMP'],
    'cuBLAS': ['cuBLAS', 'cublas', 'CUBLAS'],
    'cuSOLVER': ['cuSOLVER', 'cusolver', 'CUSOLVER'],
    'cuSolver': ['cuSolver', 'cusolver', 'CUSOLVER'],
    
    # Sparse Libraries
    'SuperLU': ['SuperLU', 'superlu', 'SUPERLU'],
    'SuperLU_DIST': ['SuperLU_DIST', 'SuperLU_Dist', 'superlu_dist', 'SuperLU / SuperLU_DIST'],
    'MUMPS': ['MUMPS', 'mumps', 'Mumps'],
    'PARDISO': ['PARDISO', 'pardiso', 'Pardiso'],
    'PEXSI': ['PEXSI', 'pexsi', 'Pexsi'],
    'CHOLMOD': ['CHOLMOD', 'cholmod', 'Cholmod'],
    'PaStiX': ['PaStiX', 'pastix', 'PASTIX'],
    
    # Eigenvalue Libraries
    'SLEPc': ['SLEPc', 'slepc', 'SLEPC'],
    'ChASE': ['ChASE', 'chase', 'CHASE'],
    'ELSI': ['ELSI', 'elsi', 'ELSI'],
    'PETSc': ['PETSc', 'petsc', 'PETSC'],
    'Trilinos': ['Trilinos', 'trilinos', 'TRILINOS'],
    
    # General Purpose Libraries
    'Intel MKL': ['MKL', 'mkl', 'Intel MKL', 'intel mkl', 'Intel Math Kernel Library'],
    'OpenBLAS': ['OpenBLAS', 'openblas', 'OPENBLAS'],
    'ATLAS': ['ATLAS', 'atlas', 'Atlas'],
    'GotoBLAS': ['GotoBLAS', 'gotoblas', 'GOTOBLAS'],
    'ACML': ['ACML', 'acml', 'Acml'],
    'ESSL': ['ESSL', 'essl', 'Essl'],
    'PLASMA': ['PLASMA', 'plasma', 'Plasma'],
    'Ginkgo': ['Ginkgo', 'ginkgo', 'GINKGO'],
    
    # Specialized Libraries
    'NTPoly': ['NTPoly', 'ntpoly', 'NTPOLY'],
    'CheSS': ['CheSS', 'chess', 'CHESS'],
    'Libint': ['Libint', 'libint', 'LIBINT'],
    'Libxc': ['Libxc', 'libxc', 'LIBXC'],
    
    # Application-specific libraries
    'Quantum ESPRESSO': ['Quantum ESPRESSO', 'quantum espresso', 'QUANTUM ESPRESSO'],
    'Yambo': ['Yambo', 'yambo', 'YAMBO'],
    'libNEGF': ['libNEGF', 'libnegf', 'LIBNEGF'],
    'CP2K': ['CP2K', 'cp2k', 'CP2K'],
    'SIESTA': ['SIESTA', 'siesta', 'Siesta'],
    'FHI-AIMS': ['FHI-AIMS', 'fhi-aims', 'FHI_aims', 'fhi_aims'],
    'CASTEP': ['CASTEP', 'castep', 'Castep'],
    'DFTB+': ['DFTB+', 'dftb+', 'DFTB+'],
    'NTChem': ['NTChem', 'ntchem', 'NTCHEM'],
    'Principle modes': ['Principle modes', 'principle modes', 'PRINCIPLE MODES'],
    'LAPACK': ['LAPACK', 'lapack', 'Lapack'],
    
    # Additional patterns
    'LAXlib': ['LAXlib', 'laxlib', 'LAXLIB'],
    'KS solvers': ['KS solvers', 'ks solvers', 'KS SOLVERS'],
    'ELSI project solvers': ['ELSI project solvers', 'elsi project solvers'],
    'ELSI-rci': ['ELSI-rci', 'elsi-rci', 'ELSI_RCI'],
    'Internal routines': ['Internal routines', 'internal routines'],
    'Custom implementations': ['Custom implementations', 'custom implementations'],
    'Matrix function libraries': ['Matrix function libraries', 'matrix function libraries'],
    'Chebyshev-based': ['Chebyshev-based', 'chebyshev-based'],
    'Quantum Chemistry Specific Libraries': ['Quantum Chemistry Specific Libraries', 'quantum chemistry specific libraries'],
}

def extract_libraries_from_file(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    filename = os.path.basename(filepath).replace('.json', '')
    app_name = data.get('library-name', filename)
    
    libraries_used = set()
    libraries_interested = set()
    libraries_mentioned = set()
    
    # Search through all fields for library mentions
    for key, value in data.items():
        if isinstance(value, list):
            for item in value:
                if isinstance(item, str):
                    for lib_name, patterns in LIBRARY_PATTERNS.items():
                        for pattern in patterns:
                            if pattern in item:
                                libraries_mentioned.add(lib_name)
                                # Determine if it's used or interested based on field name
                                if any(keyword in key.lower() for keyword in ['used', 'current', 'libs-used', 'nla-group-distributed-used', 'nla-group-specialized-used']):
                                    libraries_used.add(lib_name)
                                elif any(keyword in key.lower() for keyword in ['interest', 'interested', 'libs-interest', 'nla-group-distributed-interested', 'nla-group-specialized-interested']):
                                    libraries_interested.add(lib_name)
                                else:
                                    # For general mentions, check context
                                    if any(keyword in item.lower() for keyword in ['using', 'use', 'used', 'current', 'implemented']):
                                        libraries_used.add(lib_name)
                                    elif any(keyword in item.lower() for keyword in ['interested', 'interest', 'considering', 'planning', 'future']):
                                        libraries_interested.add(lib_name)
                                    else:
                                        # Default to mentioned
                                        libraries_mentioned.add(lib_name)
        elif isinstance(value, str):
            for lib_name, patterns in LIBRARY_PATTERNS.items():
                for pattern in patterns:
                    if pattern in value:
                        libraries_mentioned.add(lib_name)
                        if any(keyword in key.lower() for keyword in ['used', 'current', 'libs-used', 'nla-group-distributed-used', 'nla-group-specialized-used']):
                            libraries_used.add(lib_name)
                        elif any(keyword in key.lower() for keyword in ['interest', 'interested', 'libs-interest', 'nla-group-distributed-interested', 'nla-group-specialized-interested']):
                            libraries_interested.add(lib_name)
                        else:
                            if any(keyword in value.lower() for keyword in ['using', 'use', 'used', 'current', 'implemented']):
                                libraries_used.add(lib_name)
                            elif any(keyword in value.lower() for keyword in ['interested', 'interest', 'considering', 'planning', 'future']):
                                libraries_interested.add(lib_name)
                            else:
                                libraries_mentioned.add(lib_name)
    
    return app_name, libraries_used, libraries_interested, libraries_mentioned

def main():
    survey_dir = 'public/survey/nla-in-applications'
    library_data = defaultdict(lambda: {'used_by': set(), 'interested_by': set(), 'mentioned_by': set()})
    
    print("Comprehensive Library Analysis Results:")
    print("=" * 60)
    
    for filename in sorted(os.listdir(survey_dir)):
        if filename.endswith('.json'):
            filepath = os.path.join(survey_dir, filename)
            app_name, used, interested, mentioned = extract_libraries_from_file(filepath)
            
            print(f"\n{app_name} ({filename}):")
            print("-" * 40)
            
            for lib in used:
                library_data[lib]['used_by'].add(app_name)
                print(f"  USED: {lib}")
            
            for lib in interested:
                library_data[lib]['interested_by'].add(app_name)
                print(f"  INTERESTED: {lib}")
            
            for lib in mentioned - used - interested:
                library_data[lib]['mentioned_by'].add(app_name)
                print(f"  MENTIONED: {lib}")
    
    print("\n\nSUMMARY BY LIBRARY:")
    print("=" * 60)
    
    # Sort libraries by total mentions
    sorted_libraries = sorted(library_data.items(), 
                            key=lambda x: len(x[1]['used_by']) + len(x[1]['interested_by']) + len(x[1]['mentioned_by']), 
                            reverse=True)
    
    for lib_name, data in sorted_libraries:
        used_by = sorted(data['used_by'])
        interested_by = sorted(data['interested_by'])
        mentioned_by = sorted(data['mentioned_by'])
        
        total_mentions = len(used_by) + len(interested_by) + len(mentioned_by)
        if total_mentions > 0:
            print(f"\n{lib_name} (Total: {total_mentions} mentions):")
            if used_by:
                print(f"  Used by: {', '.join(used_by)}")
            if interested_by:
                print(f"  Interested by: {', '.join(interested_by)}")
            if mentioned_by:
                print(f"  Mentioned by: {', '.join(mentioned_by)}")

if __name__ == "__main__":
    main()
