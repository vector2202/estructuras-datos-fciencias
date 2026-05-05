load("@rules_java//java:defs.bzl", "java_binary", "java_library", "java_test")

java_library(
    name = "sorting_lib",
    srcs = [
        "SortAlgorithms.java",
        "AnalisisSorting.java",
    ],
    visibility = ["//visibility:public"],
)

java_binary(
    name = "AnalisisSorting",
    main_class = "sorting.AnalisisSorting",
    runtime_deps = [":sorting_lib"],
)

java_test(
    name = "SortTest",
    srcs = ["SortTest.java"],
    main_class = "org.junit.platform.console.ConsoleLauncher",
    args = ["--select-class", "sorting.SortTest"],
    use_testrunner = False,
    deps = [
        ":sorting_lib",
        "@maven//:org_junit_jupiter_junit_jupiter_api",
        "@maven//:org_junit_jupiter_junit_jupiter_engine",
        "@maven//:org_junit_platform_junit_platform_console",
        "@maven//:org_junit_platform_junit_platform_launcher",
    ],
)
