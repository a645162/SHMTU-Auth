import os
import toml

from ..utils.file.infer_encoding import read_file_with_auto_encoding

toml_config_dict: dict = {}
env_from_toml: dict = {}


def read_file_directly(file_path: str) -> str:
    with open(file_path, 'r', encoding="utf-8") as f:
        return f.read()


def parse_toml_dict(toml_dict: dict):
    global env_from_toml

    for key, value in toml_dict.items():
        if isinstance(value, dict):
            parse_toml_dict(value)
        else:
            env_from_toml[key] = value


def read_config_toml(
        toml_path: str = 'config.toml'
) -> bool:
    global toml_config_dict

    if not os.path.exists(toml_path):
        print("TOML Config is not found.")
        return False

    try:
        # file_content = read_file_directly(toml_path)
        file_content = read_file_with_auto_encoding(toml_path)
        toml_config_dict = toml.loads(file_content, dict)
        parse_toml_dict(toml_config_dict)
    except Exception as e:
        print(f"An error occurred while reading the TOML file: {e}")
        return False

    return True


if __name__ == '__main__':
    read_config_toml()
    print()
