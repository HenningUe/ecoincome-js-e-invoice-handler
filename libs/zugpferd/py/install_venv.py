
import sys
import os
from pathlib import Path
import shutil
import subprocess


def main():
    _check_py_version()
    _create_venv()
    _install_dependencies_to_venv()
    _clean_up_build_artefacts()

    
def _check_py_version():
    min_ver = (3, 12, )
    if min_ver > sys.version_info[:2]:
        min_ver_str = ".".join([str(x) for x in min_ver])
        is_ver_str = ".".join([str(x) for x in sys.version_info[:2]])
        msg = (f"Python-version must be at least {min_ver_str}. "
               f"Current version is {is_ver_str}.\n"
               f"Python executable is '{sys.executable}'")
        raise EnvironmentError(msg)
    

def _create_venv():
    venv_dir = Path(__file__).parent / ".venv"
    print(f"Creating virtual environment in '{venv_dir}'.")
    if venv_dir.is_dir():
        venv_dir2 = venv_dir.with_name(".venv2")
        try:
            venv_dir.rename(venv_dir2)
        except PermissionError:
            msg = (f"There is already a venv-dir '{venv_dir}'. "
                   f"This can not be removed. "
                   f"Please check if there are any processes accessing files")
            raise EnvironmentError(msg)  # pylint: disable=raise-missing-from
        if venv_dir2.is_dir():
            shutil.rmtree(venv_dir2)
    p_exe = sys.executable
    cmd = [str(p_exe), "-m", "venv", str(venv_dir)]
    try:
        subprocess.check_call(cmd)
    except subprocess.CalledProcessError as exc:
        msg = (f"Error creating venv at {str(venv_dir)}. "
               f"Maybe it was already created and in use. Please check.")
        raise EnvironmentError(msg) from exc
    pipexe = venv_dir / "Scripts" / "pip.exe"
    if not pipexe.is_file():
        get_pip_script = Path(__file__).parent / "get-pip.py"
        pyexe = venv_dir / "Scripts" / "python.exe"
        cmd = [f'"{pyexe}"', f'"{get_pip_script}"']
        subprocess.check_call(cmd)


def _install_dependencies_to_venv():
    repo_code_dir = Path(__file__).parent
    os.chdir(repo_code_dir)
    venv_dir = Path(__file__).parent / ".venv"
    pip_exe = venv_dir / "Scripts" / "pip.exe"
    # ignoring user settings, i.e. extra-index-urls in pip.cfg
    index_url_arg = "--index-url=https://pypi.python.org/simple"
    isolated_arg = "--isolated"
    cmd = [f'{pip_exe}', "install uv", index_url_arg, isolated_arg]
    cmd = " ".join(cmd)
    subprocess.check_call(cmd, cwd=str(repo_code_dir))
    uv_exe = venv_dir / "Scripts" / "uv"
    cmd = [f'{uv_exe}', f'pip install -r pyproject.toml', index_url_arg, isolated_arg]
    cmd = " ".join(cmd)
    subprocess.check_call(cmd, cwd=str(repo_code_dir))


def _clean_up_build_artefacts(clean_up_excludes=None):

    def remove_readonly(func, path, _):
    
        "Clear the readonly bit and reattempt the removal"
        try:
            os.chmod(path, stat.S_IWRITE)
            func(path)
        except (PermissionError, IOError):
            pass
    if clean_up_excludes is None:
        clean_up_excludes = list()

    repo_code_dir = Path(__file__).parent
    venv_dir_p = Path(__file__).parent / ".venv"
    all_items = list(repo_code_dir.glob('*.egg-info'))
    all_items.extend(repo_code_dir.rglob('__version__.py'))
    all_items.extend(repo_code_dir.rglob('VERSION'))
    all_items.extend(["test_build", "build", "dist", "__init__.py"])
    all_items.extend(["trunk/test_build", "trunk/build", "trunk/dist", "trunk/__init__.py"])
    for f in all_items:
        if isinstance(f, str):
            f = Path(f)
        if not f.is_absolute():
            f = repo_code_dir / f
        if clean_up_excludes and f.name in clean_up_excludes:
            continue
        if f.exists():
            try:
                f.relative_to(venv_dir_p)
                # elements inside venv-dir to be ignored
                continue
            except ValueError:
                pass
            try:
                try:
                    shutil.rmtree(f, onexc=remove_readonly)
                except TypeError:
                    shutil.rmtree(f, onerror=remove_readonly)
                f.unlink(missing_ok=True)
            except (PermissionError, IOError):
                pass