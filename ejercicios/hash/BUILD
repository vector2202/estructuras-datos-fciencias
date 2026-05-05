load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "hash_lib",
    srcs = [
        "TablaHash.java",
        "EjerciciosHash.java",
    ],
    visibility = ["//visibility:public"],
)

java_test(
    name = "TablaHashTest",
    srcs = ["TablaHashTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "hash.TablaHashTest"],
    use_testrunner = False,
    deps = [
        ":hash_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)

java_test(
    name = "EjerciciosHashTest",
    srcs = ["EjerciciosHashTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "hash.EjerciciosHashTest"],
    use_testrunner = False,
    deps = [
        ":hash_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
