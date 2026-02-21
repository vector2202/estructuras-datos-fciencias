load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "colas_lib",
    srcs = [
        "Cola.java",
        "GeneradorBinario.java",
    ],
    visibility = ["//visibility:public"],
)

java_test(
    name = "ColaTest",
    srcs = ["ColaTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "colas.ColaTest"],
    use_testrunner = False,
    deps = [
        ":colas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)

java_test(
    name = "GeneradorBinarioTest",
    srcs = ["GeneradorBinarioTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "colas.GeneradorBinarioTest"],
    use_testrunner = False,
    deps = [
        ":colas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
