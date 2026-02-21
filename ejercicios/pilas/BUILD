load("@rules_java//java:defs.bzl", "java_library", "java_test")

java_library(
    name = "pilas_lib",
    srcs = [
        "Pila.java",
        "BalanceadorParentesis.java",
    ],
    visibility = ["//visibility:public"],
)

java_test(
    name = "PilaTest",
    srcs = ["PilaTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "pilas.PilaTest"],
    use_testrunner = False,
    deps = [
        ":pilas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)

java_test(
    name = "BalanceadorParentesisTest",
    srcs = ["BalanceadorParentesisTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "pilas.BalanceadorParentesisTest"],
    use_testrunner = False,
    deps = [
        ":pilas_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
