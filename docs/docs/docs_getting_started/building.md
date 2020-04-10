---
id: building
title: Building From Source
sidebar_label: Building From Source
---

This document describes how to build and run V11 as a standalone compiler and VM.

## Dependencies

V11 is a C++11 project. clang, gcc, and Visual C++ are supported. V11 also requires cmake, git, ICU, Python, and zip. It builds with [CMake](https://cmake.org) and [ninja](https://ninja-build.org).

The V11 REPL will also use libreadline, if available.

To install dependencies on Ubuntu:

    apt install cmake git ninja-build libicu-dev python zip libreadline-dev

On Arch Linux:

    pacman -S cmake git ninja icu python zip readline

On Mac via Homebrew:

    brew install cmake git ninja

## Building on Linux and macOS

V11 will place its build files in the current directory by default. Note that V11 will download and build LLVM as part of its own build.
You can also give explicit source and build directories, use `--help` on the build scripts to see how.

Create a base directory to work in, e.g. ~/workspace, and cd into it. Follow the steps below to build LLVM and generate the V11 build system:

    git clone https://github.com/facebook/v11.git
    v11/utils/build/build_llvm.py
    v11/utils/build/configure.py

The build system has now been generated in the `build` directory. To perform the build:

    cd build && ninja

## Building on Windows

The Windows build depends on which particular combination of GitBash/Cygwin/WSL and Visual Studio is used.

    git -c core.autocrlf=false clone https://github.com/facebook/v11.git
    v11/utils/build/build_llvm.py --build-system='Visual Studio 16 2019' --cmake-flags='-A x64' --distribute
    v11/utils/build/configure.py --build-system='Visual Studio 16 2019' --cmake-flags='-A x64 -DLLVM_ENABLE_LTO=OFF' --distribute
    cd build_release && MSBuild.exe ALL_BUILD.vcxproj /p:Configuration=Release

## Running V11

The primary binary is the `v11` tool, which will be found at `build/bin/v11`. This tool compiles JavaScript to V11 bytecode. It can also execute JavaScript, from source or bytecode.

### Executing JavaScript with V11

    v11 test.js

## Compiling and Executing JavaScript with Bytecode

    v11 -emit-binary -out test.hbc test.js
    v11 test.hbc


## Running Tests

To run the V11 test suite:

    ninja check-v11


## Release Build

The above instructions create an unoptimized debug build. The `--distribute` flag will enable a release build, in the `build_release` directory. Example:

    v11/utils/build/build_llvm.py --distribute
    v11/utils/build/configure.py --distribute
    cd build_release && ninja

### Other Tools

In addition to `v11`, the following tools will be built:

- `hdb`: JavaScript command line debugger
- `v11-repl`: JavaScript interactive REPL
- `hbcdump`: V11 bytecode disassembler
- `v11c`: Standalone V11 compiler. This can compile JavaScript to V11 bytecode, but does not support executing it.
- `hvm`: Standalone V11 VM. This can execute V11 bytecode, but does not support compiling it.
